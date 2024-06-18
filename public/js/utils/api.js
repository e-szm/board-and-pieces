"use strict";

export async function changePassword(obj) {
  const url = "/api/v1/users/change-my-password";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = JSON.stringify(obj);

  return await fetch(url, {
    method: "PATCH",
    headers,
    body,
  });
}

export async function getDurationStats(start, end) {
  const url = `/api/v1/matches/duration-stats/start/${start}/end/${end}`;

  return await fetch(url);
}

export async function getOpeningStats(start, end) {
  const url = `/api/v1/matches/opening-stats/start/${start}/end/${end}`;

  return await fetch(url);
}

export async function getRatingTrends(start, end) {
  const url = `/api/v1/matches/rating-trends/start/${start}/end/${end}`;

  return await fetch(url);
}

export async function getRefresh(start, end) {
  const url = `/api/v1/matches/refresh/start/${start}/end/${end}`;

  return await fetch(url);
}

export async function login(obj) {
  const url = "/api/v1/users/login";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = JSON.stringify(obj);

  return await fetch(url, {
    method: "POST",
    headers,
    body,
  });
}

export async function logout() {
  const url = "/api/v1/users/logout";

  return await fetch(url);
}

export async function signup(obj) {
  const url = "/api/v1/users/signup";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = JSON.stringify(obj);

  return await fetch(url, {
    method: "POST",
    headers,
    body,
  });
}
