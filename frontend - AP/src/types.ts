import { BoxProps, ButtonProps, SelectProps, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";

//-------------------------------------------------------
//------------MUI Components Types-----------------------
//--------------------------------------------------start
export type BoxChildrenProps = BoxProps & {
  children: ReactNode;
};

export type CustomButtonProps = ButtonProps & {
  // Extending ButtonProps to inherit MUI Button's props
  color?: "primary" | "secondary" | "accent";
  btnSize?: "md" | "lg";
  children: React.ReactNode; // Children prop for button content
};

export type CustomInputFieldTypes = TextFieldProps & {
  fieldColor?: string;
};

export type CustomSelectFieldTypes = SelectProps & {
  fieldColor?: string;
  options: { value: string; name: string }[]; // The array of options for the select field
};
//-------------------------------------------------------
//------------MUI Components Types-----------------------
//----------------------------------------------------end

//-------------------------------------------------------
//------------Character Object Types---------------------
//---------------------------------------------------start
type ChainThrow = {
  name: string;
  throw: string[];
  throwBreak: string[];
  followUp: string[];
  followUpBreak: string[];
  simpleInput?: string[];
  simpleBreak?: string[];
};

type Move = {
  move: string;
  description?: string;
  escape?: string;
  followUp?: string;
  combo?: string;
  category?: string;
  input?: string;
  type?: string;
};

type HeatDashEnder = {
  engager?: string;
  ender?: string;
};

type Frame = {
  move: string;
  frames: string;
};

type Punisher = {
  startup: Frame[];
};

type ImportantCombo = {
  launchers: string[];
  followUps: string[];
  followUpSimple?: string[];
  vidUrl?: string;
  endTime?: number;
};

type DetailedCounterStrategy = {
  title: string;
  description: string;
  other: {
    move: string;
    counter: string;
    details: string;
  }[];
};

type Counter = {
  overview: string;
  effectiveRange: string;
  counterStrategy: string;
  weakSide: "SSR" | "SSL" | "SWR" | "SWL";
  keyMovesToPunish: {
    move: string;
    punish: string;
    purpose: string;
  }[];
  detailedCounterStrategies: DetailedCounterStrategy[];
};

type CreatorNote = {
  author: string;
  socialMediaLink: string;
  socialMediaIcon: string;
  stapleCombo: string[];
  notes: {
    title: string;
    move?: string;
    content: string;
  }[];
};

export type Character = {
  _id: string;
  name: string;
  image: string;
  heatSystem?: HeatDashEnder;
  mostImportantGrabs?: Move[];
  guaranteedFollowUps?: Move[];
  heatEngagers?: Move[];
  importantMoves?: Move[];
  punishers?: Punisher;
  importantCombos?: ImportantCombo[];
  wallCombos?: {
    general: Move[];
    withTornado: Move[];
  };
  comboEnders?: Move[];
  chainThrows?: ChainThrow[];
  counterSchema?: Counter[];
  creatorNotes?: CreatorNote[];
};

//-------------------------------------------------------
//------------Character Object Types---------------------
//----------------------------------------------------end
