import { Method } from "axios";

const defaults = {
  methods: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  },
  versions: {
    v1: {
      version: "/api",
    },
  },
};

const endPoints = {
  test: {
    method: "GET",
    ...defaults.versions.v1,
    uri: "/test",
    headerProps: {},
  },

  // auth endpoints
  me: {
    method: "GET",
    ...defaults.versions.v1,
    uri: "/users/me",
    headerProps: {},
  },
  login: {
    method: "POST",
    ...defaults.versions.v1,
    uri: "/auth/local",
    headerProps: {},
  },
  logout: {
    method: "DELETE",
    ...defaults.versions.v1,
    uri: "/auth/logout",
    headerProps: {},
  },
  register: {
    method: "POST",
    ...defaults.versions.v1,
    uri: "/auth/local/register",
    // headerProps: {},
  },
  users: {
    method: "GET",
    ...defaults.versions.v1,
    uri: "/user",
    // headerProps: {},
  },
  deleteUser: {
    method: "DELETE",
    ...defaults.versions.v1,
    uri: "/user/:name",
    // headerProps: {},
  },
  updateUser: {
    method: "PUT",
    ...defaults.versions.v1,
    uri: "/user",
    // headerProps: {},
  },
  event:{
    allEvents:  {
      method: "GET",
      ...defaults.versions.v1,
      uri: "/event",
      // headerProps: {},
    },
    addEvent: {
      method: "POST",
      ...defaults.versions.v1,
      uri: "/event",
      // headerProps: {},
    },
    updateEvent: {
      method: "PUT",
      ...defaults.versions.v1,
      uri: "/event",
      // headerProps: {},
    },
    deleteEvent:{
      method: "DELETE",
      ...defaults.versions.v1,
      uri: "/event",
      // headerProps: {},
    }
  }
  
};

export default endPoints;
