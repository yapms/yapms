{
	description = "YAPms";

	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
		utils.url = "github:numtide/flake-utils";
	};

	outputs = { nixpkgs, utils, ... }:
	utils.lib.eachDefaultSystem(system:
		let
			pkgs = nixpkgs.legacyPackages.${system};
		in {
			virtualisation.docker.enable = true;
			devShells.default = pkgs.mkShell {
				buildInputs = [
					pkgs.nodejs_24
					pkgs.go
					pkgs.ansible
					pkgs.libwebp
					pkgs.biome
				];
				shellHook = ''
					npx devcontainer up --workspace-folder .
					echo "Welcome to the YAPms development environment!"
				'';
			};
		}
	);
}
