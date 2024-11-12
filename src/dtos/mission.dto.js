export const bodyToMission = (body) => {
    return {
      money: body.money,
      score: body.score,
    };
  };
  
  export const responseFromMission = (mission) => {
    return {
      id: mission.id,
      money: mission.money,
      score: mission.score,
    };
  };
  
  export const responseFromMemberMission = (memberMission) => {
    return {
      id: memberMission.id,
      status: memberMission.status,
    };
  };
  
  export const responseFromMemberMissionList = (memberMissionList) => {
    const missions = memberMissionList.map((memberMission) =>
      responseFromMission(memberMission.mission)
    );
  
    return { missions: missions };
  };
  
  export const responseFromMissionList = (missionList) => {
    return missionList.map((mission) => responseFromMission(mission));
  };
  