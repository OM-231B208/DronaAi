/**
 * api.js — Centralized fetch wrapper that automatically injects
 * the X-Recruiter-Id header so every backend call is scoped
 * to the currently authenticated recruiter.
 *
 * Usage:
 *   import { api } from '../api';
 *   const data = await api.get('/api/workspaces');
 *   const data = await api.post('/api/workspaces', { title, description });
 *   const data = await api.postForm('/api/match', formData);
 *   await api.delete(`/api/workspaces/${id}`);
 */

const BASE = 'http://localhost:5000';

let _recruiterId = 'default';

/** Call this once when the user logs in to set the recruiter ID globally. */
export function setRecruiterId(id) {
  _recruiterId = id || 'default';
}

function authHeaders(extra = {}) {
  return {
    'X-Recruiter-Id': _recruiterId,
    ...extra,
  };
}

export const api = {
  async get(path) {
    const res = await fetch(`${BASE}${path}`, {
      headers: authHeaders(),
    });
    return res.json();
  },

  async post(path, body) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body),
    });
    return res.json();
  },

  /** For multipart/form-data (resume uploads, etc.) */
  async postForm(path, formData) {
    // Inject recruiter_id as a form field so it reaches the /api/match endpoint
    formData.append('recruiter_id', _recruiterId);
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: authHeaders(), // NO Content-Type — browser sets it with boundary
      body: formData,
    });
    return res.json();
  },

  async put(path, body) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body),
    });
    return res.json();
  },

  async patch(path, body) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'PATCH',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body),
    });
    return res.json();
  },

  async delete(path) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return res.json();
  },
};
