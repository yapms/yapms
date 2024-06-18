{
	description = "YAPms";

	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
		utils.url = "github:numtide/flake-utils";
	};

	outputs = { self, nixpkgs, utils }:
	utils.lib.eachDefaultSystem(system:
		let
			pkgs = nixpkgs.legacyPackages.${system};
		in {
			virtualisation.docker.enable = true;
			devShells.default = pkgs.mkShell {
				buildInputs = [
					pkgs.nodejs_20
					pkgs.go
					pkgs.gcc
					pkgs.ansible
					pkgs.libwebp
				];
				shellHook = ''
					npx devcontainer up --workspace-folder .
					echo "Welcome to the YAPms development environment!"
				'';
			};
		}
	);
}
