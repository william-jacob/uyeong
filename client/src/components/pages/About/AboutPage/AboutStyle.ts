import styled from '@_settings/styled';

export const SECTION = {} as any;
export const DIV = {} as any;

const rightBorder = (color: string) => `
  &::after {
    content: '';
    position: absolute;
    top: -20px;
    left: 20px;
    width: 1.7px; //border: 2px;
    height: 80%;
    background-color: ${color};
  }
`;

SECTION.Frame = styled.section`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.FONT_C};
`;

DIV.AboutPart1 = styled.div`
  // border: 1px solid black;
  width: auto;
  height: 400px;
`;

DIV.AboutPart2 = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto%;

  & > div:nth-of-type(1) {
    border-top: 2px solid ${({ theme }) => theme.BD_C};
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    min-width: 300px;
    min-height: 150px;
    margin: 0 0 100px 0;
    padding: 10px 10px 0 50px;
    ${({ theme }) => rightBorder(theme.BD_C)}

    & p {
      // border: 1px solid black;
      // margin-top: 5px;
    }
  }

  & > div:nth-of-type(2) {
    border-top: 2px solid ${({ theme }) => theme.BD_C};
    position: relative;
    min-width: 300px;
    min-height: 150px;
    height: 150px;
    padding: 10px 10px 0 50px;
    ${({ theme }) => rightBorder(theme.BD_C)}

    & > ul {
      // border: 1px solid red;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      width: 100%;
      height: 100%;

      & li {
        // border: 1px solid black;
        display: flex;

        .location-icon {
          // border: 1px solid black;
          width: 13px;
          fill: #444444;
          margin-right: 7px;
        }

        & > a {
          display: flex;

          .envelope-icon {
            width: 13px;
            fill: #444444;
            margin-right: 7px;
          }
          .github-icon {
            width: 14px;
            fill: #444444;
            margin-right: 7px;
          }
          .instagram-icon {
            width: 13px;
            fill: #444444;
            margin-right: 7px;
          }
        }
      }
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > div:nth-of-type(1) {
      width: 300px;
      height: 150px;
    }

    & > div:nth-of-type(2) {
      width: 300px;
      height: 150px;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    & > div:nth-of-type(1) {
      width: 230px;
      height: 130px;
      min-width: 230px;
      min-height: 130px;
      margin: 0 30px 0 0;
    }

    & > div:nth-of-type(2) {
      width: 230px;
      height: 130px;
      min-width: 230px;
      min-height: 130px;
      margin: 0 0 0 30px;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    & > div:nth-of-type(1) {
      width: 330px;
      height: 150px;
    }
    & > div:nth-of-type(2) {
      width: 330px;
      height: 230px;
    }
  }
`;

DIV.AboutPart3 = styled.div`
  border-top: 2px solid ${({ theme }) => theme.BD_C};
  width: auto;
  margin: 150px 0;

  & > div {
    // border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    width: 100%;
    height: auto;
    min-width: 300px;
    min-height: 50px;
    padding-top: 30px;

    & > .quote-left-icon {
      // border: 1px solid black;
      width: 40px;
      margin-left: 5px;
      fill: ${({ theme }) => theme.FONT_C};
    }
    & > .quote-right-icon {
      // border: 1px solid black;
      width: 40px;
      margin-right: 5px;
      fill: ${({ theme }) => theme.FONT_C};
    }

    & > p {
      // border: 1px solid black;
      font-family: 'Square Peg', cursive;
      font-weight: 600;
      font-size: 25px;
      text-align: center;

      & > span {
        font-size: 15px;
      }
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    & > div {
      width: 300px;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    & > div {
      width: 400px;

      & > p {
        font-size: 30px;

        & > span {
          font-size: 20px;
        }
      }
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    & > div {
      width: 600px;
    }
  }
`;

DIV.AboutPart4 = styled.div`
  // border-top: 2px solid ${({ theme }) => theme.BD_C};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  padding-bottom: 50px;

  & > div:nth-of-type(1) {
    border-top: 2px solid ${({ theme }) => theme.BD_C};
    position: relative;
    width: auto;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    margin: 0 0 100px 0;
    padding: 0 10px 10px 40px;
    ${({ theme }) => rightBorder(theme.BD_C)}

    & > h3 {
      padding: 20px 0 0 10px;
    }
  }

  & > div:nth-of-type(2) {
    border-top: 2px solid ${({ theme }) => theme.BD_C};
    position: relative;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    // padding: 10px 0 0 10px;
    padding: 10px 10px 0 45px;
    ${({ theme }) => rightBorder(theme.BD_C)}

    & > h3 {
      padding: 10px 0 10px 0;
    }

    & > ul {
      // border: 1px solid black;
      padding-bottom: 10px;

      & > li {
        padding-bottom: 15px;
      }
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.MOBILE}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > div:nth-of-type(1) {
      width: 300px;
      height: 100%;
    }
    & > div:nth-of-type(2) {
      width: 300px;
      height: 100%;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    & > div:nth-of-type(1) {
      width: 230px;
      height: 100%;
      min-width: 230px;
      min-height: 130px;
      margin: 0 30px 0 0;
    }
    & > div:nth-of-type(2) {
      width: 230px;
      height: 100%;
      min-width: 230px;
      min-height: 130px;
      margin: 0 0 0 30px;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
    & > div:nth-of-type(1) {
      width: 330px;
      height: 100%;
    }
    & > div:nth-of-type(2) {
      width: 330px;
      height: 100%;
    }
  }
`;
