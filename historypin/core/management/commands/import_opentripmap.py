import time
import requests
from googletrans import Translator
from django.core.management.base import BaseCommand
from core.models import Region, City, Monument

API_KEY = '5ae2e3f221c38a28845f05b6e65e0c98d65ffd8f744f6443cec9c835'
LANG_EN = 'en'
LANG_FR = 'fr'


class Command(BaseCommand):
    help = 'Import monuments from OpenTripMap'

    def handle(self, *args, **kwargs):
        bbox = {
            "lon_min": -5.1406,
            "lat_min": 41.3337,
            "lon_max": 9.5593,
            "lat_max": 51.1242
        }

        offset = 0
        limit = 500
        total_imported = 0

        while True:
            url = f"https://api.opentripmap.com/0.1/en/places/bbox?lon_min={bbox['lon_min']}&lat_min={bbox['lat_min']}&lon_max={bbox['lon_max']}&lat_max={bbox['lat_max']}&kinds=historic&format=json&limit={limit}&offset={offset}&apikey={API_KEY}"

            try:
                response = self.make_request(url)
                data = response.json()
            except requests.exceptions.RequestException as e:
                self.stdout.write(self.style.ERROR(f"Error fetching data from OpenTripMap API: {e}"))
                return

            if not data:
                break

            for item in data:
                name = item.get('name', '')[:1000]
                lat = item.get('point', {}).get('lat')
                lon = item.get('point', {}).get('lon')
                xid = item.get('xid')

                if not name or not lat or not lon or not xid:
                    continue

                city_name, region_name, address = self.get_city_region_address(lat, lon)
                address = (address or '')[:1000]

                description, image_url = self.get_monument_details(xid)

                if description != "No description available":
                    description = self.translate_description(description)

                region, _ = Region.objects.get_or_create(name=region_name[:400])

                city, _ = City.objects.get_or_create(
                    name=city_name[:400],
                    region=region,
                    defaults={"latitude": lat, "longitude": lon}
                )

                Monument.objects.get_or_create(
                    name=name[:1000],
                    city=city,
                    defaults={
                        "description": description,
                        "latitude": lat,
                        "longitude": lon,
                        "image_url": image_url,
                        "address": address
                    }
                )

                total_imported += 1

            offset += limit

        self.stdout.write(self.style.SUCCESS(f'Successfully imported {total_imported} monuments from OpenTripMap'))

    def make_request(self, url, retries=3, delay=5):
        for _ in range(retries):
            try:
                response = requests.get(url, timeout=10)
                response.raise_for_status()
                return response
            except requests.exceptions.RequestException as e:
                self.stdout.write(self.style.WARNING(f"Request failed: {e}. Retrying in {delay} seconds..."))
                time.sleep(delay)
        raise requests.exceptions.RequestException(f"Failed to retrieve data after {retries} attempts")

    def get_city_region_address(self, lat, lon):
        for zoom in [10, 12, 14]:
            url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}&zoom={zoom}&addressdetails=1"
            try:
                response = self.make_request(url)
                data = response.json()
                city = data.get('address', {}).get('city', 'Unknown')
                region = data.get('address', {}).get('state', 'Unknown')
                address = data.get('display_name', 'Unknown address')
                if city != 'Unknown':
                    return city, region, address
            except requests.exceptions.RequestException:
                pass
        return "Unknown", "Unknown", "Unknown address"

    def get_monument_details(self, xid):
        url = f"https://api.opentripmap.com/0.1/en/places/xid/{xid}?apikey={API_KEY}"
        try:
            response = self.make_request(url)
            data = response.json()
            description = data.get('wikipedia_extracts', {}).get('text', 'No description available')
            image_url = data.get('preview', {}).get('source', None)
            return description, image_url
        except requests.exceptions.RequestException:
            return "No description available", None

    def translate_description(self, description):
        translator = Translator()
        translated = translator.translate(description, src='en', dest='fr')
        return translated.text
