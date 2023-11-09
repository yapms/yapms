# run the following command to update all house SVGs to have groups
# ls ../apps/yapms/src/lib/assets/maps/usa/*.svg | xargs gawk -f add-groups-to-house.awk -i inplace

/region="AL-/ { sub(/path/, "path action-groups=\"1\"") }
/region="AK-/ { sub(/path/, "path action-groups=\"2\"") }
/region="AZ-/ { sub(/path/, "path action-groups=\"3\"") }
/region="AR-/ { sub(/path/, "path action-groups=\"4\"") }
/region="CA-/ { sub(/path/, "path action-groups=\"5\"") }
/region="CO-/ { sub(/path/, "path action-groups=\"6\"") }
/region="CT-/ { sub(/path/, "path action-groups=\"7\"") }
/region="DE-/ { sub(/path/, "path action-groups=\"8\"") }
/region="FL-/ { sub(/path/, "path action-groups=\"9\"") }
/region="GA-/ { sub(/path/, "path action-groups=\"10\"") }
/region="HI-/ { sub(/path/, "path action-groups=\"11\"") }
/region="ID-/ { sub(/path/, "path action-groups=\"12\"") }
/region="IL-/ { sub(/path/, "path action-groups=\"13\"") }
/region="IN-/ { sub(/path/, "path action-groups=\"14\"") }
/region="IA-/ { sub(/path/, "path action-groups=\"15\"") }
/region="KS-/ { sub(/path/, "path action-groups=\"16\"") }
/region="KY-/ { sub(/path/, "path action-groups=\"17\"") }
/region="LA-/ { sub(/path/, "path action-groups=\"18\"") }
/region="ME-/ { sub(/path/, "path action-groups=\"19\"") }
/region="MD-/ { sub(/path/, "path action-groups=\"20\"") }
/region="MA-/ { sub(/path/, "path action-groups=\"21\"") }
/region="MI-/ { sub(/path/, "path action-groups=\"22\"") }
/region="MN-/ { sub(/path/, "path action-groups=\"23\"") }
/region="MS-/ { sub(/path/, "path action-groups=\"24\"") }
/region="MO-/ { sub(/path/, "path action-groups=\"25\"") }
/region="MT-/ { sub(/path/, "path action-groups=\"26\"") }
/region="NE-/ { sub(/path/, "path action-groups=\"27\"") }
/region="NV-/ { sub(/path/, "path action-groups=\"28\"") }
/region="NH-/ { sub(/path/, "path action-groups=\"29\"") }
/region="NJ-/ { sub(/path/, "path action-groups=\"30\"") }
/region="NM-/ { sub(/path/, "path action-groups=\"31\"") }
/region="NY-/ { sub(/path/, "path action-groups=\"32\"") }
/region="NC-/ { sub(/path/, "path action-groups=\"33\"") }
/region="ND-/ { sub(/path/, "path action-groups=\"34\"") }
/region="OH-/ { sub(/path/, "path action-groups=\"35\"") }
/region="OK-/ { sub(/path/, "path action-groups=\"36\"") }
/region="OR-/ { sub(/path/, "path action-groups=\"37\"") }
/region="PA-/ { sub(/path/, "path action-groups=\"38\"") }
/region="RI-/ { sub(/path/, "path action-groups=\"39\"") }
/region="SC-/ { sub(/path/, "path action-groups=\"40\"") }
/region="SD-/ { sub(/path/, "path action-groups=\"41\"") }
/region="TN-/ { sub(/path/, "path action-groups=\"42\"") }
/region="TX-/ { sub(/path/, "path action-groups=\"43\"") }
/region="UT-/ { sub(/path/, "path action-groups=\"44\"") }
/region="VT-/ { sub(/path/, "path action-groups=\"45\"") }
/region="VA-/ { sub(/path/, "path action-groups=\"46\"") }
/region="WA-/ { sub(/path/, "path action-groups=\"47\"") }
/region="WV-/ { sub(/path/, "path action-groups=\"48\"") }
/region="WI-/ { sub(/path/, "path action-groups=\"49\"") }
/region="WY-/ { sub(/path/, "path action-groups=\"50\"") }

/title="USA [0-9]{4} House/ { sub(/xmlns/, "action-groups=\"States\" xmlns") }

{
	print
}
