export interface IPegInfo {
	syntax?: string;
	line?: number;
	column?: number;
	offset?: number;
	endPos?: number;
}

export interface IHeader extends IPegInfo {
	module: IModule;
	project: IProject;
	authors: IAuthor[];
	definitions: IDefinitions;
}

export interface IModule extends IPegInfo {
	name: string;
	version?: string;
}

export interface IProject extends IPegInfo {
	url: string;
}

export interface IAuthor extends IPegInfo {
	name: string;
	url: string;
}

export interface IDefinitions extends IPegInfo {
	url: string;
}
