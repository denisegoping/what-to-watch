import React from 'react';
import styled from 'styled-components'

var MovieTable = require("../../Table/index.tsx").MovieTable;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #eae3ff;
  min-height: 115vh;
  width: 100vw;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  margin: 35px 0 30px 0;
  font-family: Georgia;
  width: 100%;
`;

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: row;
`;

const Name = styled.div`
  color: #3a1e8f;
  font-weight: bold;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin: 0px 80px 10px 80px;
  font-family: Georgia;
  flex-direction: column;
`;

const DescriptionMessage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 5px 0px;
`;

export const LandingPage = () => {
  return (
    <PageContainer>
      <HeaderContainer>
        <WelcomeMessage>Welcome to&nbsp;
          <Name>What to Watch!</Name>&nbsp;
        </WelcomeMessage>
      </HeaderContainer>
      <TopContainer>
        <DescriptionMessage>
          A website containing the latest 25 popular movies
          submitted by you!
        </DescriptionMessage>
        <DescriptionMessage>
          Scroll through the list to get
          inspiration for your next movie binge, edit the list
          by adding or removing movies, and customize the list
          by filtering by genre. Enjoy!
        </DescriptionMessage>
      </TopContainer>
      <MovieTable />
    </PageContainer>
  )
}

// add updating feature?
