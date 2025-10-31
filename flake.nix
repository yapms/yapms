{
	description = "YAPms";

	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
		utils.url = "github:numtide/flake-utils";
	};

	outputs = { self, nixpkgs, utils, ... }:
	utils.lib.eachDefaultSystem(system:
		let
			pkgs = nixpkgs.legacyPackages.${system};
			biome = (import ./pkgs/biome.nix) { pkgs = pkgs; };
		in {

			# packages.${system}.biome = (import ./pkgs/biome.nix) { pkgs = pkgs; };
			
			virtualisation.docker.enable = true;
			devShells.default = pkgs.mkShell {
				buildInputs = [
					pkgs.nodejs_22
					pkgs.go
					pkgs.ansible
					pkgs.libwebp
					biome
					# self.packages.${system}.biome
					# (import ./pkgs/biome.nix) { pkgs = pkgs; }
				];
				shellHook = ''
					npx devcontainer up --workspace-folder .
					echo "Welcome to the YAPms development environment!"
				'';
			};
		}
	);
}
