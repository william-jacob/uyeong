import styled from '@emotion/styled';

export const StyledHeader = styled.header`
  border: 1px solid #dadada;
  position: relative;
  width: 100%;
  height: 150px;
`;

export const StyledNav = styled.nav`
  // background-color: #d3d5c9;
  border: 1px solid #dadada;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 750px;
  height: 60px;
  border-radius: 30px;

  & > ul {
    border: 1px solid #dadada;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;

    & > li > a {
      // border: 1px solid black;
      //다크모드
      color: blue;
    }

    & > li:nth-of-type(5) {
      // border: 1px solid black;
      position: relative;
      cursor: pointer;
      width: 100px;

      & > ul {
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 40px;
        z-index: 999;
        left: -2px;
        width: 130px;
        height: 200px;
        border-radius: 10px;
        background-color: white;

        & > li {
          width: 100%;
          height: 100%;

          & > button,
          a {
            // border: 1px solid black;
            display: flex;
            justify-content: start;
            align-items: center;
            padding-left: 7px;
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
      }
    }
  }
  //+스크롤시 nav width만 남도록 하기
`;