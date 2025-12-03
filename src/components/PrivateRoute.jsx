import React from 'react'
import { Navigate } from 'react-router-dom'

const isAuthenticated = () => {
    return localStorage.getItem('agendaU_user') === 'true'
}

export default function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
    }
    return children
}
