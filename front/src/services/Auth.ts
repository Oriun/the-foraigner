import { API_BASE } from './Constantes'
import { APIError } from './Utils';

export const register = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  if(response.ok) return
  const body = await response.json();
  throw new APIError("Error registering", response.status, body);
};

export const logout = async () => {
  const response = await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if(response.ok) return
  const body = await response.json();
  throw new APIError("Error logging out", response.status, body);
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  if(response.ok) return
  if(response.status === 403) return // already logged
  const body = await response.json();
  await logout().catch(()=>{});
  throw new APIError("Error loging", response.status, body);
};
