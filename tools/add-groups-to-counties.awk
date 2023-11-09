# run the following command to update all the SVGs to have url parameters
# ls ../apps/yapms/src/lib/assets/maps/**/*.svg | xargs gawk -f add-url-params-to-svgs.awk -i inplace

/, Alabama/ { sub(/path/, "path fill-groups=\"1\"") }
/, Alaska/ { sub(/path/, "path fill-groups=\"2\"") }
/, Arizona/ { sub(/path/, "path fill-groups=\"3\"") }
/, Arkansas/ { sub(/path/, "path fill-groups=\"4\"") }
/, California/ { sub(/path/, "path fill-groups=\"5\"") }
/, Colorado/ { sub(/path/, "path fill-groups=\"6\"") }
/, Connecticut/ { sub(/path/, "path fill-groups=\"7\"") }
/, Delaware/ { sub(/path/, "path fill-groups=\"8\"") }
/, Florida/ { sub(/path/, "path fill-groups=\"9\"") }
/, Georgia/ { sub(/path/, "path fill-groups=\"10\"") }
/, Hawaii/ { sub(/path/, "path fill-groups=\"11\"") }
/, Idaho/ { sub(/path/, "path fill-groups=\"12\"") }
/, Illinois/ { sub(/path/, "path fill-groups=\"13\"") }
/, Indiana/ { sub(/path/, "path fill-groups=\"14\"") }
/, Iowa/ { sub(/path/, "path fill-groups=\"15\"") }
/, Kansas/ { sub(/path/, "path fill-groups=\"16\"") }
/, Kentucky/ { sub(/path/, "path fill-groups=\"17\"") }
/, Louisiana/ { sub(/path/, "path fill-groups=\"18\"") }
/, Maine/ { sub(/path/, "path fill-groups=\"19\"") }
/, Maryland/ { sub(/path/, "path fill-groups=\"20\"") }
/, Massachusetts/ { sub(/path/, "path fill-groups=\"21\"") }
/, Michigan/ { sub(/path/, "path fill-groups=\"22\"") }
/, Minnesota/ { sub(/path/, "path fill-groups=\"23\"") }
/, Mississippi/ { sub(/path/, "path fill-groups=\"24\"") }
/, Missouri/ { sub(/path/, "path fill-groups=\"25\"") }
/, Montana/ { sub(/path/, "path fill-groups=\"26\"") }
/, Nebraska/ { sub(/path/, "path fill-groups=\"27\"") }
/, Nevada/ { sub(/path/, "path fill-groups=\"28\"") }
/, New Hampshire/ { sub(/path/, "path fill-groups=\"29\"") }
/, New Jersey/ { sub(/path/, "path fill-groups=\"30\"") }
/, New Mexico/ { sub(/path/, "path fill-groups=\"31\"") }
/, New York/ { sub(/path/, "path fill-groups=\"32\"") }
/, North Carolina/ { sub(/path/, "path fill-groups=\"33\"") }
/, North Dakota/ { sub(/path/, "path fill-groups=\"34\"") }
/, Ohio/ { sub(/path/, "path fill-groups=\"35\"") }
/, Oklahoma/ { sub(/path/, "path fill-groups=\"36\"") }
/, Oregon/ { sub(/path/, "path fill-groups=\"37\"") }
/, Pennsylvania/ { sub(/path/, "path fill-groups=\"38\"") }
/, Rhode Island/ { sub(/path/, "path fill-groups=\"39\"") }
/, South Carolina/ { sub(/path/, "path fill-groups=\"40\"") }
/, South Dakota/ { sub(/path/, "path fill-groups=\"41\"") }
/, Tennessee/ { sub(/path/, "path fill-groups=\"42\"") }
/, Texas/ { sub(/path/, "path fill-groups=\"43\"") }
/, Utah/ { sub(/path/, "path fill-groups=\"44\"") }
/, Vermont/ { sub(/path/, "path fill-groups=\"45\"") }
/, Virginia/ { sub(/path/, "path fill-groups=\"46\"") }
/, Washington/ { sub(/path/, "path fill-groups=\"47\"") }
/, West Virginia/ { sub(/path/, "path fill-groups=\"48\"") }
/, Wisconsin/ { sub(/path/, "path fill-groups=\"49\"") }
/, Wyoming/ { sub(/path/, "path fill-groups=\"50\"") }

{
	print
}
