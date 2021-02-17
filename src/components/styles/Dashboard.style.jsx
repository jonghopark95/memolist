import styled from "styled-components";

export const DashboardWrapper = styled.div`
  width: 90%;
  height: 100px;
  background-color: #dadada;
  margin: 20px 0px;
  display: flex;
  align-items: center;
  padding: 20px;
`;

export const Photo = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-color: black;
  margin: 0px 30px;
`;

export const InnerSpan = styled.span`
  font-size: 20px;
`;

export const Name = styled.span`
  font-weight: bold;
`;

export const Title = styled(Name)``;
