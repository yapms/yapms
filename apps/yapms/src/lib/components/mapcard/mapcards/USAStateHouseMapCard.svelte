<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Virginia',
			route: '/app/usa/va_lower/2023/blank'
		},
		{
			label: 'New Jersey',
			route: '/app/usa/nj_lower/2023/blank'
		},
		{
			label: 'Mississippi',
			route: '/app/usa/ms_lower/2023/blank'
		},
		{
			route: '/app/usa/al_lower/2022/blank',
			label: 'Alabama 2022'
		},
		{
			route: '/app/usa/ak_lower/2022/blank',
			label: 'Alaska 2022'
		},
		{
			route: '/app/usa/az_lower/2022/blank',
			label: 'Arizona 2022'
		},
		{
			route: '/app/usa/ar_lower/2022/blank',
			label: 'Arkansas 2022'
		},
		{
			route: '/app/usa/ca_lower/2022/blank',
			label: 'California 2022'
		},
		{
			route: '/app/usa/co_lower/2022/blank',
			label: 'Colorado 2022'
		},
		{
			route: '/app/usa/ct_lower/2022/blank',
			label: 'Connecticut 2022'
		},
		{
			route: '/app/usa/de_lower/2022/blank',
			label: 'Delaware 2022'
		},
		{
			route: '/app/usa/fl_lower/2022/blank',
			label: 'Florida 2022'
		},
		{
			route: '/app/usa/ga_lower/2022/blank',
			label: 'Georgia 2022'
		},
		{
			route: '/app/usa/hi_lower/2022/blank',
			label: 'Hawaii 2022'
		},
		{
			route: '/app/usa/id_lower/2022/blank',
			label: 'Idaho 2022'
		},
		{
			route: '/app/usa/il_lower/2022/blank',
			label: 'Illinois 2022'
		},
		{
			route: '/app/usa/in_lower/2022/blank',
			label: 'Indiana 2022'
		},
		{
			route: '/app/usa/ia_lower/2022/blank',
			label: 'Iowa 2022'
		},
		{
			route: '/app/usa/ks_lower/2022/blank',
			label: 'Kansas 2022'
		},
		{
			route: '/app/usa/ky_lower/2022/blank',
			label: 'Kentucky 2022'
		},
		{
			route: '/app/usa/la_lower/2023/blank',
			label: 'Louisiana 2023'
		},
		{
			route: '/app/usa/me_lower/2022/blank',
			label: 'Maine 2022'
		},
		{
			route: '/app/usa/md_lower/2022/blank',
			label: 'Maryland 2022'
		},
		{
			route: '/app/usa/ma_lower/2022/blank',
			label: 'Massachusetts 2022'
		},
		{
			route: '/app/usa/mi_lower/2022/blank',
			label: 'Michigan 2022'
		},
		{
			route: '/app/usa/mn_lower/2022/blank',
			label: 'Minnesota 2022'
		},
		{
			route: '/app/usa/ms_lower/2023/blank',
			label: 'Mississippi 2023'
		},
		{
			route: '/app/usa/mo_lower/2022/blank',
			label: 'Missouri 2022'
		},
		{
			route: '/app/usa/mt_lower/2022/blank',
			label: 'Montana 2022'
		},
		{
			route: '/app/usa/nv_lower/2022/blank',
			label: 'Nevada 2022'
		},
		{
			route: '/app/usa/nh_lower/2022/blank',
			label: 'New Hampshire 2022'
		},
		{
			route: '/app/usa/nj_lower/2023/blank',
			label: 'New Jersey 2023'
		},
		{
			route: '/app/usa/nm_lower/2022/blank',
			label: 'New Mexico 2022'
		},
		{
			route: '/app/usa/ny_lower/2022/blank',
			label: 'New York 2022'
		},
		{
			route: '/app/usa/nc_lower/2024/blank',
			label: 'North Carolina 2024'
		},
		{
			route: '/app/usa/nc_lower/2022/blank',
			label: 'North Carolina 2022'
		},
		{
			route: '/app/usa/nd_lower/2022/blank',
			label: 'North Dakota 2022'
		},
		{
			route: '/app/usa/oh_lower/2022/blank',
			label: 'Ohio 2022'
		},
		{
			route: '/app/usa/ok_lower/2022/blank',
			label: 'Oklahoma 2022'
		},
		{
			route: '/app/usa/or_lower/2022/blank',
			label: 'Oregon 2022'
		},
		{
			route: '/app/usa/pa_lower/2022/blank',
			label: 'Pennsylvania 2022'
		},
		{
			route: '/app/usa/ri_lower/2022/blank',
			label: 'Rhode Island 2022'
		},
		{
			route: '/app/usa/sc_lower/2022/blank',
			label: 'South Carolina 2022'
		},
		{
			route: '/app/usa/sd_lower/2022/blank',
			label: 'South Dakota 2022'
		},
		{
			route: '/app/usa/tn_lower/2022/blank',
			label: 'Tennessee 2022'
		},
		{
			route: '/app/usa/tx_lower/2022/blank',
			label: 'Texas 2022'
		},
		{
			route: '/app/usa/ut_lower/2022/blank',
			label: 'Utah 2022'
		},
		{
			route: '/app/usa/vt_lower/2022/blank',
			label: 'Vermont 2022'
		},
		{
			route: '/app/usa/va_lower/2023/blank',
			label: 'Virginia 2023'
		},
		{
			route: '/app/usa/wa_lower/2022/blank',
			label: 'Washington 2022'
		},
		{
			route: '/app/usa/wv_lower/2022/blank',
			label: 'West Virginia 2022'
		},
		{
			route: '/app/usa/wi_lower/2022/blank',
			label: 'Wisconsin 2022'
		},
		{
			route: '/app/usa/wy_lower/2022/blank',
			label: 'Wyoming 2022'
		}
	];
</script>

<MapCard name="USA State Houses" bg="usastatehouse" attribution="Photo by Steve" {links} />
