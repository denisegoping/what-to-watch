import styled from 'styled-components'

export const lightPurple = "#eae3ff";
export const lightYellow = "#fcf2b1";
export const white = "#ffffff";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${lightPurple};
  min-height: 115vh;
  width: 100vw;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  margin: 35px 0 30px 0;
  font-family: Georgia;
  width: 100%;
`;

export const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Name = styled.div`
  color: #3a1e8f;
  font-weight: bold;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin: 0px 80px 10px 80px;
  font-family: Georgia;
  flex-direction: column;
`;

export const DescriptionMessage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 5px 0px;
`;

export const BodyContainer = styled.div`
  justify-content: center;
  align-items: center;
  font-family: Georgia;
  margin-bottom: 10px;
`;
