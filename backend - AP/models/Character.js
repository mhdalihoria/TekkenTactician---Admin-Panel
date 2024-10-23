import mongoose from "mongoose";

const { Schema, model } = mongoose;

const chainThrowSchema = new Schema({
  name: { type: String, required: true },
  throw: [{ type: String, required: true }],
  throwBreak: [{ type: String, required: true }],
  followUp: [{ type: String, required: true }],
  followUpBreak: [{ type: String, required: true }],
  simpleInput: [{ type: String, required: false }],
  simpleBreak: [{ type: String, required: false }],
});

const moveSchema = new Schema({
  move: { type: String, required: true },
  description: String,
  escape: String,
  followUp: String,
  combo: String,
  category: String,
  input: String, // We keep this for the input notation of the move
  type: String, // We'll use this to categorize moves as 'poke', 'mini combo', 'command grab', etc.
});

const heatDashEnderSchema = new Schema({
  engager: String,
  ender: String,
});

const frameSchema = new Schema({
  move: { type: String, required: true },
  frames: { type: String, required: true },
});

const punisherSchema = new Schema({
  startup: [frameSchema],
});
const importantComboSchema = new Schema({
  launchers: [{ type: String, required: true }],
  followUps: [{ type: String, required: true }],
  followUpSimple: [{ type: String }],
  vidUrl: { type: String, required: false },
  endTime: { type: Number, required: false },
});

const detailedCounterStrategies = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  other: [
    {
      move: {
        type: String,
        required: true,
      },
      counter: {
        type: String,
        required: true,
      },
      details: {
        type: String,
        required: true,
      },
    },
  ],
});

const counterSchema = new Schema({
  overview: {
    type: String,
    required: true,
  },
  effectiveRange: {
    type: String,
    required: true,
  },
  counterStrategy: {
    type: String,
    required: true,
  },
  weakSide: {
    type: String,
    required: true,
    enum: ["SSR", "SSL", "SWR", "SWL"],
  },
  keyMovesToPunish: [
    {
      move: {
        type: String,
        required: true,
      },
      punish: {
        type: String,
        required: true,
      },
      purpose: {
        type: String,
        required: true,
      },
    },
  ],
  detailedCounterStrategies: [detailedCounterStrategies],
});

const creatorNotesSchema = new Schema({
  author: { type: String, required: true },
  socialMediaLink: { type: String, required: true },
  socialMediaIcon: { type: String, required: true },
  stapleCombo: [{ type: String, required: true }],
  notes: [
    {
      title: { type: String, required: true },
      move: { type: String, required: false },
      content: { type: String, required: true },
    },
  ],
});

const characterSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  heatSystem: heatDashEnderSchema,
  mostImportantGrabs: [moveSchema],
  guaranteedFollowUps: [moveSchema],
  heatEngagers: [moveSchema],
  importantMoves: [moveSchema],
  punishers: punisherSchema,
  importantCombos: [importantComboSchema],
  wallCombos: {
    general: [moveSchema],
    withTornado: [moveSchema],
  },
  comboEnders: [moveSchema],
  chainThrows: [chainThrowSchema],
  counterSchema: [counterSchema],
  creatorNotes: [creatorNotesSchema],
});

const Character = model("Character", characterSchema);

export default Character;
