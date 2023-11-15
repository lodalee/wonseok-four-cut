import styled from "styled-components";

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 72px;
  background-color: #fff;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.11);
  padding: 0 20px;

  .header-wrraper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left-wrraper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    a {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 1.2rem;
      transition: color 0.2s;
      &:hover {
        color: aqua;
      }
    }
  }
  .center-wrraper {
    flex-flow: 1;
  }
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;

    .logo-tag {
      color: black;
    }
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: auto;
    font-size: 15px;
    padding: 12px;
    border-radius: 5px;
    background-color: #fff;
    transition: background-color 0.2s;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  }
  .right-wrraper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .btn-p {
    font-size: 12px;
    &:hover {
      color: #000;
    }
  }
`;

const SidebarContainer = styled.aside`
  /* position: fixed;
  top: 0; */
  width: 260px;

  color: black;
  .sticky {
    top: 72px;
    height: calc(100vh - 72px);
    position: sticky;
    width: 260px;
  }
  .sidebar-wrraper {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    padding: 0 0 0 16px;
  }
  .userSection {
    display: flex;
    padding: 24px 0 12px 6px;
    width: 100%;
    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      justify-content: center;
      padding: 0 10px;
    }
  }

  .linkSection,
  .otherSection {
    gap: 10px;
    display: flex;
    .link-container {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      height: 40px;
      border-radius: 5px;
      padding: 8px 16px;
      font-size: 13px;
      background-color: #fff;
      transition: all 0.5s;
      &:hover {
        background-color: #eee;
      }
      p {
        font-weight: 400;
        display: flex;
        text-align: start;
      }
    }
    .icon-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
    }
    .link-name {
      flex-flow: 1;
    }
  }
  .linkSection {
    flex-direction: column;
    flex-grow: 1;
  }
`;

const LayoutContainer = styled.div`
  min-height: 100vh;
  height: 100%;
`;
const ContentLayout = styled.div`
  display: flex;
  height: 100%;
  min-height: calc(100vh - 72px);
  .outlet {
    flex-grow: 1;
  }
`;

export { HeaderContainer, SidebarContainer, LayoutContainer, ContentLayout };
