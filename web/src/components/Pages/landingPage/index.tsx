import React from 'react';
var { DescriptionMessage, HeaderContainer, Name, PageContainer, TopContainer, WelcomeMessage } = require('../../styles.tsx');
var MovieTable = require("../../Table/index.tsx").MovieTable;

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
