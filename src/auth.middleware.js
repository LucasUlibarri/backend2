export function requireRole(requiredRole){
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({
                status: 'error',
                error: 'Forbidden',
                message: `Necesitas el rol ${requiredRole} para acceder a este recurso`
            });
        }
        next();
    };
}