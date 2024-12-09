/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as LayoutImport } from "./routes/_layout";
import { Route as IndexImport } from "./routes/index";
import { Route as SigninIndexImport } from "./routes/signin/index";
import { Route as SignupDoctorIndexImport } from "./routes/signup/doctor/index";
import { Route as SignupAccountIndexImport } from "./routes/signup/account/index";
import { Route as LayoutDoctorsProfileIndexImport } from "./routes/_layout/doctors/profile/index";
import { Route as LayoutDoctorsHomeIndexImport } from "./routes/_layout/doctors/home/index";
import { Route as LayoutDoctorsChatIndexImport } from "./routes/_layout/doctors/chat/index";
import { Route as LayoutDoctorsPatientsPrimaryIndexImport } from "./routes/_layout/doctors/patients/primary/index";
import { Route as LayoutDoctorsCallsChannelIdIndexImport } from "./routes/_layout/doctors/calls/$channelId/index";
import { Route as LayoutDoctorsCallsChannelIdEndIndexImport } from "./routes/_layout/doctors/calls/$channelId/end/index";

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
	id: "/_layout",
	getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
	path: "/",
	getParentRoute: () => rootRoute,
} as any);

const SigninIndexRoute = SigninIndexImport.update({
	path: "/signin/",
	getParentRoute: () => rootRoute,
} as any);

const SignupDoctorIndexRoute = SignupDoctorIndexImport.update({
	path: "/signup/doctor/",
	getParentRoute: () => rootRoute,
} as any);

const SignupAccountIndexRoute = SignupAccountIndexImport.update({
	path: "/signup/account/",
	getParentRoute: () => rootRoute,
} as any);

const LayoutDoctorsProfileIndexRoute = LayoutDoctorsProfileIndexImport.update({
	path: "/doctors/profile/",
	getParentRoute: () => LayoutRoute,
} as any);

const LayoutDoctorsHomeIndexRoute = LayoutDoctorsHomeIndexImport.update({
	path: "/doctors/home/",
	getParentRoute: () => LayoutRoute,
} as any);

const LayoutDoctorsChatIndexRoute = LayoutDoctorsChatIndexImport.update({
	path: "/doctors/chat/",
	getParentRoute: () => LayoutRoute,
} as any);

const LayoutDoctorsPatientsPrimaryIndexRoute =
	LayoutDoctorsPatientsPrimaryIndexImport.update({
		path: "/doctors/patients/primary/",
		getParentRoute: () => LayoutRoute,
	} as any);

const LayoutDoctorsCallsChannelIdIndexRoute =
	LayoutDoctorsCallsChannelIdIndexImport.update({
		path: "/doctors/calls/$channelId/",
		getParentRoute: () => LayoutRoute,
	} as any);

const LayoutDoctorsCallsChannelIdEndIndexRoute =
	LayoutDoctorsCallsChannelIdEndIndexImport.update({
		path: "/doctors/calls/$channelId/end/",
		getParentRoute: () => LayoutRoute,
	} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
	interface FileRoutesByPath {
		"/": {
			id: "/";
			path: "/";
			fullPath: "/";
			preLoaderRoute: typeof IndexImport;
			parentRoute: typeof rootRoute;
		};
		"/_layout": {
			id: "/_layout";
			path: "";
			fullPath: "";
			preLoaderRoute: typeof LayoutImport;
			parentRoute: typeof rootRoute;
		};
		"/signin/": {
			id: "/signin/";
			path: "/signin";
			fullPath: "/signin";
			preLoaderRoute: typeof SigninIndexImport;
			parentRoute: typeof rootRoute;
		};
		"/signup/account/": {
			id: "/signup/account/";
			path: "/signup/account";
			fullPath: "/signup/account";
			preLoaderRoute: typeof SignupAccountIndexImport;
			parentRoute: typeof rootRoute;
		};
		"/signup/doctor/": {
			id: "/signup/doctor/";
			path: "/signup/doctor";
			fullPath: "/signup/doctor";
			preLoaderRoute: typeof SignupDoctorIndexImport;
			parentRoute: typeof rootRoute;
		};
		"/_layout/doctors/chat/": {
			id: "/_layout/doctors/chat/";
			path: "/doctors/chat";
			fullPath: "/doctors/chat";
			preLoaderRoute: typeof LayoutDoctorsChatIndexImport;
			parentRoute: typeof LayoutImport;
		};
		"/_layout/doctors/home/": {
			id: "/_layout/doctors/home/";
			path: "/doctors/home";
			fullPath: "/doctors/home";
			preLoaderRoute: typeof LayoutDoctorsHomeIndexImport;
			parentRoute: typeof LayoutImport;
		};
		"/_layout/doctors/profile/": {
			id: "/_layout/doctors/profile/";
			path: "/doctors/profile";
			fullPath: "/doctors/profile";
			preLoaderRoute: typeof LayoutDoctorsProfileIndexImport;
			parentRoute: typeof LayoutImport;
		};
		"/_layout/doctors/calls/$channelId/": {
			id: "/_layout/doctors/calls/$channelId/";
			path: "/doctors/calls/$channelId";
			fullPath: "/doctors/calls/$channelId";
			preLoaderRoute: typeof LayoutDoctorsCallsChannelIdIndexImport;
			parentRoute: typeof LayoutImport;
		};
		"/_layout/doctors/patients/primary/": {
			id: "/_layout/doctors/patients/primary/";
			path: "/doctors/patients/primary";
			fullPath: "/doctors/patients/primary";
			preLoaderRoute: typeof LayoutDoctorsPatientsPrimaryIndexImport;
			parentRoute: typeof LayoutImport;
		};
		"/_layout/doctors/calls/$channelId/end/": {
			id: "/_layout/doctors/calls/$channelId/end/";
			path: "/doctors/calls/$channelId/end";
			fullPath: "/doctors/calls/$channelId/end";
			preLoaderRoute: typeof LayoutDoctorsCallsChannelIdEndIndexImport;
			parentRoute: typeof LayoutImport;
		};
	}
}

// Create and export the route tree

interface LayoutRouteChildren {
	LayoutDoctorsChatIndexRoute: typeof LayoutDoctorsChatIndexRoute;
	LayoutDoctorsHomeIndexRoute: typeof LayoutDoctorsHomeIndexRoute;
	LayoutDoctorsProfileIndexRoute: typeof LayoutDoctorsProfileIndexRoute;
	LayoutDoctorsCallsChannelIdIndexRoute: typeof LayoutDoctorsCallsChannelIdIndexRoute;
	LayoutDoctorsPatientsPrimaryIndexRoute: typeof LayoutDoctorsPatientsPrimaryIndexRoute;
	LayoutDoctorsCallsChannelIdEndIndexRoute: typeof LayoutDoctorsCallsChannelIdEndIndexRoute;
}

const LayoutRouteChildren: LayoutRouteChildren = {
	LayoutDoctorsChatIndexRoute: LayoutDoctorsChatIndexRoute,
	LayoutDoctorsHomeIndexRoute: LayoutDoctorsHomeIndexRoute,
	LayoutDoctorsProfileIndexRoute: LayoutDoctorsProfileIndexRoute,
	LayoutDoctorsCallsChannelIdIndexRoute: LayoutDoctorsCallsChannelIdIndexRoute,
	LayoutDoctorsPatientsPrimaryIndexRoute:
		LayoutDoctorsPatientsPrimaryIndexRoute,
	LayoutDoctorsCallsChannelIdEndIndexRoute:
		LayoutDoctorsCallsChannelIdEndIndexRoute,
};

const LayoutRouteWithChildren =
	LayoutRoute._addFileChildren(LayoutRouteChildren);

export interface FileRoutesByFullPath {
	"/": typeof IndexRoute;
	"": typeof LayoutRouteWithChildren;
	"/signin": typeof SigninIndexRoute;
	"/signup/account": typeof SignupAccountIndexRoute;
	"/signup/doctor": typeof SignupDoctorIndexRoute;
	"/doctors/chat": typeof LayoutDoctorsChatIndexRoute;
	"/doctors/home": typeof LayoutDoctorsHomeIndexRoute;
	"/doctors/profile": typeof LayoutDoctorsProfileIndexRoute;
	"/doctors/calls/$channelId": typeof LayoutDoctorsCallsChannelIdIndexRoute;
	"/doctors/patients/primary": typeof LayoutDoctorsPatientsPrimaryIndexRoute;
	"/doctors/calls/$channelId/end": typeof LayoutDoctorsCallsChannelIdEndIndexRoute;
}

export interface FileRoutesByTo {
	"/": typeof IndexRoute;
	"": typeof LayoutRouteWithChildren;
	"/signin": typeof SigninIndexRoute;
	"/signup/account": typeof SignupAccountIndexRoute;
	"/signup/doctor": typeof SignupDoctorIndexRoute;
	"/doctors/chat": typeof LayoutDoctorsChatIndexRoute;
	"/doctors/home": typeof LayoutDoctorsHomeIndexRoute;
	"/doctors/profile": typeof LayoutDoctorsProfileIndexRoute;
	"/doctors/calls/$channelId": typeof LayoutDoctorsCallsChannelIdIndexRoute;
	"/doctors/patients/primary": typeof LayoutDoctorsPatientsPrimaryIndexRoute;
	"/doctors/calls/$channelId/end": typeof LayoutDoctorsCallsChannelIdEndIndexRoute;
}

export interface FileRoutesById {
	__root__: typeof rootRoute;
	"/": typeof IndexRoute;
	"/_layout": typeof LayoutRouteWithChildren;
	"/signin/": typeof SigninIndexRoute;
	"/signup/account/": typeof SignupAccountIndexRoute;
	"/signup/doctor/": typeof SignupDoctorIndexRoute;
	"/_layout/doctors/chat/": typeof LayoutDoctorsChatIndexRoute;
	"/_layout/doctors/home/": typeof LayoutDoctorsHomeIndexRoute;
	"/_layout/doctors/profile/": typeof LayoutDoctorsProfileIndexRoute;
	"/_layout/doctors/calls/$channelId/": typeof LayoutDoctorsCallsChannelIdIndexRoute;
	"/_layout/doctors/patients/primary/": typeof LayoutDoctorsPatientsPrimaryIndexRoute;
	"/_layout/doctors/calls/$channelId/end/": typeof LayoutDoctorsCallsChannelIdEndIndexRoute;
}

export interface FileRouteTypes {
	fileRoutesByFullPath: FileRoutesByFullPath;
	fullPaths:
		| "/"
		| ""
		| "/signin"
		| "/signup/account"
		| "/signup/doctor"
		| "/doctors/chat"
		| "/doctors/home"
		| "/doctors/profile"
		| "/doctors/calls/$channelId"
		| "/doctors/patients/primary"
		| "/doctors/calls/$channelId/end";
	fileRoutesByTo: FileRoutesByTo;
	to:
		| "/"
		| ""
		| "/signin"
		| "/signup/account"
		| "/signup/doctor"
		| "/doctors/chat"
		| "/doctors/home"
		| "/doctors/profile"
		| "/doctors/calls/$channelId"
		| "/doctors/patients/primary"
		| "/doctors/calls/$channelId/end";
	id:
		| "__root__"
		| "/"
		| "/_layout"
		| "/signin/"
		| "/signup/account/"
		| "/signup/doctor/"
		| "/_layout/doctors/chat/"
		| "/_layout/doctors/home/"
		| "/_layout/doctors/profile/"
		| "/_layout/doctors/calls/$channelId/"
		| "/_layout/doctors/patients/primary/"
		| "/_layout/doctors/calls/$channelId/end/";
	fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
	IndexRoute: typeof IndexRoute;
	LayoutRoute: typeof LayoutRouteWithChildren;
	SigninIndexRoute: typeof SigninIndexRoute;
	SignupAccountIndexRoute: typeof SignupAccountIndexRoute;
	SignupDoctorIndexRoute: typeof SignupDoctorIndexRoute;
}

const rootRouteChildren: RootRouteChildren = {
	IndexRoute: IndexRoute,
	LayoutRoute: LayoutRouteWithChildren,
	SigninIndexRoute: SigninIndexRoute,
	SignupAccountIndexRoute: SignupAccountIndexRoute,
	SignupDoctorIndexRoute: SignupDoctorIndexRoute,
};

export const routeTree = rootRoute
	._addFileChildren(rootRouteChildren)
	._addFileTypes<FileRouteTypes>();

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_layout",
        "/signin/",
        "/signup/account/",
        "/signup/doctor/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/doctors/chat/",
        "/_layout/doctors/home/",
        "/_layout/doctors/profile/",
        "/_layout/doctors/calls/$channelId/",
        "/_layout/doctors/patients/primary/",
        "/_layout/doctors/calls/$channelId/end/"
      ]
    },
    "/signin/": {
      "filePath": "signin/index.tsx"
    },
    "/signup/account/": {
      "filePath": "signup/account/index.tsx"
    },
    "/signup/doctor/": {
      "filePath": "signup/doctor/index.tsx"
    },
    "/_layout/doctors/chat/": {
      "filePath": "_layout/doctors/chat/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/doctors/home/": {
      "filePath": "_layout/doctors/home/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/doctors/profile/": {
      "filePath": "_layout/doctors/profile/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/doctors/calls/$channelId/": {
      "filePath": "_layout/doctors/calls/$channelId/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/doctors/patients/primary/": {
      "filePath": "_layout/doctors/patients/primary/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/doctors/calls/$channelId/end/": {
      "filePath": "_layout/doctors/calls/$channelId/end/index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
