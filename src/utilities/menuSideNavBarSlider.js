export const getMenuStyle = (isMenuOpen) => ({
    position: "fixed",
    top: 0,
    left: isMenuOpen ? 0 : "-150%",
    width: "350px",
    height: "100vh",
    color: "white",
    padding: "20px",
    zIndex: 100,
    transition: "left 1s",
});