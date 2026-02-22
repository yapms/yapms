<script lang="ts">
	// Set script to have context="module" if you want to share attribution between cards using the same bg string
	// Then you can export and import in another file like normal
	import MapCard from '../MapCard.svelte';

	// Groups is an array of type HomeGroupData[]
	// That means routes is an array of type HomeLinkData[].
	// modalLabel is an optional property, and controls what text shows for a map in the MoreMapsModal opened via "Browse Maps"
	// Routes within a group will display left to right and then down, with the number of cols = ceil(# routes/2)

	// If the group is named (label !== undefined) and there is not sufficient width to show all columns, the entire group will not show.
	// If label is undefined, columns will show one by one as space becomes available

	// If the property showOnCard is set to false, the group will not show on the card.
	// If the property showInModal is set to false, the routes from this group will not show in the MoreMapsModal.
	const groups = [
		{
			label: 'Group 1', // If space is not available for two columns, will not show entire group
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Map',
					modalLabel: '2022 Map',
					route: '/app/exp/map/2022/blank'
				},
				{
					label: '2022 Results',
					modalLabel: '2022 Map Results',
					route: '/app/exp/map/2022/results'
				},
				{
					label: '2020 Results',
					modalLabel: '2020 Map Results',
					route: '/app/exp/map/2020/results'
				}
			]
		},
		{
			label: undefined, // If space for two columns is not available, will just show Municipalities and Regions
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Municipalities',
					route: '/app/exp/municipalities/2021/blank'
				},
				{
					label: 'Regions',
					route: '/app/exp/regions/2021/blank'
				},
				{
					label: 'Councils',
					route: '/app/exp/councils/2021/blank'
				}
			]
		}
	];

	// attribution is an array of type HomeLinkData[]
	const attribution = [
		{
			label: 'Example by FirstName LastName',
			route: 'https:/example.com'
		},
		{
			label: 'YAPms by FirstName LastName',
			route: 'https://yapms.com'
		}
	];
</script>

<!-- Name property is the country name, bg property specifies which directory from src/lib/assets/images/countries to look for blended.webp in -->
<!-- To create blended.webp for a given directory, you must find 2 or 4 800x600 images, and set their names to one.jpg thru four.jpg. -->
<!-- You then need to run blend2.py or blend4.py with the bg string as an argument using Python. That script repeats these instructions. -->
<MapCard name="Denmark" bg="exp" {groups} {attribution} />
