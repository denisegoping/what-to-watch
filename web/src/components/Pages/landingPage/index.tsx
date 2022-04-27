import React from 'react';
import styled from 'styled-components'

var MusicTable = require("../../Table/index.tsx").MusicTable;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 32px;
  margin: 35px 0 40px 0;
  font-family: Comfortaa;
  width: 100%;
`;

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: row;
`;

const Name = styled.div`
  color: #0033cc;
  font-weight: bold;
`;

export const LandingPage = () => {
    return (
        <PageContainer>
          <HeaderContainer>
            <WelcomeMessage>Welcome to
              <Name>Neighbourhood Nods!</Name>
            </WelcomeMessage>
          </HeaderContainer>
           <MusicTable/>
        </PageContainer>
    )
}

// export default LandingPage;
