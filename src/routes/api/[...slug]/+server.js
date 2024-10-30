import { app } from '$lib/server/api/index.js'

export const GET = ({ request }) => app.request(request)
export const PUT = ({ request }) => app.request(request)
export const DELETE = ({ request }) => app.fetch(request)
export const POST = ({ request }) => app.fetch(request)
export const PATCH = ({ request }) => app.fetch(request)
export const fallback = ({ request }) => app.fetch(request)