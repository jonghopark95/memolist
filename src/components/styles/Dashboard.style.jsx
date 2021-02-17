import styled from "styled-components";

export const DashboardWrapper = styled.div`
  width: 90%;
  height: 100px;
  background-color: ${({ bg }) => bg};
  margin: 20px 0px;
  display: flex;
  align-items: center;
  padding: 20px;
`;

export const Photo = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  margin: 0px 30px;
`;

export const InnerSpan = styled.span`
  font-size: 20px;
`;

export const Name = styled.span`
  font-weight: bold;
`;

export const Title = styled(Name)``;
