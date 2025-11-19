<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Virginia',
			route: '/app/usa/va_upper/2023/blank'
		},
		{
			label: 'New Jersey',
			route: '/app/usa/nj_upper/2023/blank'
		},
		{
			label: 'Mississippi',
			route: '/app/usa/ms_upper/2025127/blank'
		},
		{
			route: '/app/usa/al_upper/2025322/blank',
			label: 'Alabama 2026'
		},
		{
			route: '/app/usa/al_upper/2022/blank',
			label: 'Alabama 2022'
		},
		{
			route: '/app/usa/ak_upper/2022/blank',
			label: 'Alaska 2022'
		},
		{
			route: '/app/usa/az_upper/2022/blank',
			label: 'Arizona 2022'
		},
		{
			route: '/app/usa/ar_upper/2022/blank',
			label: 'Arkansas 2022'
		},
		{
			route: '/app/usa/ca_upper/2022/blank',
			label: 'California 2022'
		},
		{
			route: '/app/usa/co_upper/2022/blank',
			label: 'Colorado 2022'
		},
		{
			route: '/app/usa/ct_upper/2022/blank',
			label: 'Connecticut 2022'
		},
		{
			route: '/app/usa/de_upper/2022/blank',
			label: 'Delaware 2022'
		},
		{
			route: '/app/usa/fl_upper/2022/blank',
			label: 'Florida 2022'
		},
		{
			route: '/app/usa/ga_upper/2023363/blank',
			label: 'Georgia 2024'
		},
		{
			route: '/app/usa/ga_upper/2022/blank',
			label: 'Georgia 2022'
		},
		{
			route: '/app/usa/hi_upper/2022/blank',
			label: 'Hawaii 2022'
		},
		{
			route: '/app/usa/id_upper/2022/blank',
			label: 'Idaho 2022'
		},
		{
			route: '/app/usa/il_upper/2022/blank',
			label: 'Illinois 2022'
		},
		{
			route: '/app/usa/in_upper/2022/blank',
			label: 'Indiana 2022'
		},
		{
			route: '/app/usa/ia_upper/2022/blank',
			label: 'Iowa 2022'
		},
		{
			route: '/app/usa/ks_upper/2022/blank',
			label: 'Kansas 2022'
		},
		{
			route: '/app/usa/ky_upper/2022/blank',
			label: 'Kentucky 2022'
		},
		{
			route: '/app/usa/la_upper/2023/blank',
			label: 'Louisiana 2023'
		},
		{
			route: '/app/usa/me_upper/2022/blank',
			label: 'Maine 2022'
		},
		{
			route: '/app/usa/md_upper/2022/blank',
			label: 'Maryland 2022'
		},
		{
			route: '/app/usa/ma_upper/2022/blank',
			label: 'Massachusetts 2022'
		},
		{
			route: '/app/usa/mi_upper/2024208/blank',
			label: 'Michigan 2026'
		},
		{
			route: '/app/usa/mi_upper/2022/blank',
			label: 'Michigan 2022'
		},
		{
			route: '/app/usa/mn_upper/2022/blank',
			label: 'Minnesota 2022'
		},
		{
			route: '/app/usa/ms_upper/2025127/blank',
			label: 'Mississippi 2025'
		},
		{
			route: '/app/usa/ms_upper/2023/blank',
			label: 'Mississippi 2023'
		},
		{
			route: '/app/usa/mo_upper/2022/blank',
			label: 'Missouri 2022'
		},
		{
			route: '/app/usa/mt_upper/2023044/blank',
			label: 'Montana 2024'
		},
		{
			route: '/app/usa/mt_upper/2022/blank',
			label: 'Montana 2022'
		},
		{
			route: '/app/usa/ne_upper/2022/blank',
			label: 'Nebraska 2022'
		},
		{
			route: '/app/usa/nv_upper/2022/blank',
			label: 'Nevada 2022'
		},
		{
			route: '/app/usa/nh_upper/2022/blank',
			label: 'New Hampshire 2022'
		},
		{
			route: '/app/usa/nj_upper/2023/blank',
			label: 'New Jersey 2023'
		},
		{
			route: '/app/usa/nm_upper/2022/blank',
			label: 'New Mexico 2022'
		},
		{
			route: '/app/usa/ny_upper/2022/blank',
			label: 'New York 2022'
		},
		{
			route: '/app/usa/nc_upper/2023298/blank',
			label: 'North Carolina 2024'
		},
		{
			route: '/app/usa/nc_upper/2022/blank',
			label: 'North Carolina 2022'
		},
		{
			route: '/app/usa/nd_upper/2022/blank',
			label: 'North Dakota 2022'
		},
		{
			route: '/app/usa/oh_upper/2023272/blank',
			label: 'Ohio 2024'
		},
		{
			route: '/app/usa/oh_upper/2022/blank',
			label: 'Ohio 2022'
		},
		{
			route: '/app/usa/ok_upper/2022/blank',
			label: 'Oklahoma 2022'
		},
		{
			route: '/app/usa/or_upper/2022/blank',
			label: 'Oregon 2022'
		},
		{
			route: '/app/usa/pa_upper/2022/blank',
			label: 'Pennsylvania 2022'
		},
		{
			route: '/app/usa/ri_upper/2022/blank',
			label: 'Rhode Island 2022'
		},
		{
			route: '/app/usa/sc_upper/2022/blank',
			label: 'South Carolina 2022'
		},
		{
			route: '/app/usa/sd_upper/2022/blank',
			label: 'South Dakota 2022'
		},
		{
			route: '/app/usa/tn_upper/2022/blank',
			label: 'Tennessee 2022'
		},
		{
			route: '/app/usa/tx_upper/2022/blank',
			label: 'Texas 2022'
		},
		{
			route: '/app/usa/ut_upper/2022/blank',
			label: 'Utah 2022'
		},
		{
			route: '/app/usa/vt_upper/2022/blank',
			label: 'Vermont 2022'
		},
		{
			route: '/app/usa/va_upper/2023/blank',
			label: 'Virginia 2023'
		},
		{
			route: '/app/usa/wa_upper/2024074/blank',
			label: 'Washington 2024'
		},
		{
			route: '/app/usa/wa_upper/2022/blank',
			label: 'Washington 2022'
		},
		{
			route: '/app/usa/wv_upper/2022/blank',
			label: 'West Virginia 2022'
		},
		{
			route: '/app/usa/wi_upper/2024050/blank',
			label: 'Wisconsin 2024'
		},
		{
			route: '/app/usa/wi_upper/2022/blank',
			label: 'Wisconsin 2022'
		},
		{
			route: '/app/usa/wy_upper/2022/blank',
			label: 'Wyoming 2022'
		}
	];
</script>

<MapCard
	name="USA State Senates"
	bg="usastatesenate"
	attribution="Photo by Tyler Moore"
	attributionLink="https://pixabay.com/photos/salt-lake-city-capitol-capital-1659141/"
	{links}
/>
