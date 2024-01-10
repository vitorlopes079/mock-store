export const getBagStyle = (isBagOpen) => ({
    position: "fixed",
    top: 0,
    right: isBagOpen ? 0 : "-150%",
    width: "350px",
    height: "100%",
    backgroundColor: "#edf2f7",
    transition: "right 0.3s ease-in-out",
    zIndex: 100,
  })