import { prisma } from "../db.config.js";

export const addMission = async (data) => {
  const created = await prisma.mission.create({
    data: data,
  });
  return created.id;
};

export const getMission = async (missionId) => {
  const mission = await prisma.mission.findFirstOrThrow({
    where: { id: missionId },
  });

  return mission;
};

export const addMemberMission = async (missionId, memberId) => {
  const created = await prisma.memberMission.create({
    data: {
      missionId: missionId,
      memberId: memberId,
    },
  });

  return created.id;
};

export const getMemberMissionById = async (memberMissionId) => {
  const memberMission = await prisma.memberMission.findFirstOrThrow({
    where: { id: memberMissionId },
  });

  return memberMission;
};

export const getMemberMissionByMemberIdAndMissionId = async (
  memberId,
  missionId
) => {
  const memberMission = await prisma.memberMission.findFirstOrThrow({
    where: {
      memberId: memberId,
      missionId: missionId,
    },
  });

  return memberMission;
};

export const getMemberMissionListByMemberId = async (memberId) => {
  const memberMissionList = await prisma.MemberMission.findMany({
    select: {
      id: true,
      mission: true,
    },
    where: { memberId: memberId },
    orderBy: {
      missionId: "asc",
    },
  });

  return memberMissionList;
};

export const getMemberMissionListByStatus = async (memberId, status) => {
  const memberMissionList = await prisma.MemberMission.findMany({
    select: {
      id: true,
      mission: true,
    },
    where: {
      memberId: memberId,
      status: status,
    },
  });

  return memberMissionList;
};
