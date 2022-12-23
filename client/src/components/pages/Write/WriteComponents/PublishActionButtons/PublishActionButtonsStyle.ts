import styled from '@_settings/styled';

export const StyledPublishActionButtons = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: end;
  width: 100%;
  height: 100%;

  & > .action-buttons-block {
    // border: 1px solid black;
    display: flex;
    justify-content: end;
    align-items: end;
    width: 300px;
    height: 100px;
    // padding-left: 20px;

    & > button {
      border: 1px solid black;
      height: 45px;
      border-radius: 15px;
    }

    & .cancel-button {
      width: 70px;
    }

    & .post-button {
      width: 100px;
      margin-left: 25px;
    }

    & > button:hover {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;