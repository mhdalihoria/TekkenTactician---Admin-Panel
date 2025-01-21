const guideSchema = {
  guide: {
    name: {
      controlType: "input-field",
      value: "",
      label: "Name",
      placeholder: "Character Name",
    },
    picUrl: {
      controlType: "input-field",
      value: "",
      label: "Pic Url",
      placeholder: "Character Pic URL",
    },
    heatEngagers: {
      controlType: "array",
      label: "Heat Engagers",
      items: [],
      template: {
        move: {
          controlType: "input-field",
          value: "",
          label: "Move",
          placeholder: "1+2",
        },
        description: {
          controlType: "input-field",
          value: "",
          label: "Description",
          placeholder: "Kinda op ngl",
        },
      },
    },
    punishers: {
      controlType: "array",
      label: "Punishers",
      items: [],
      template: {
        startup: {
          controlType: "input-field",
          value: "",
          label: "Startup",
          placeholder: "i13, i15, etc...",
        },
        move: {
          controlType: "input-field",
          value: "",
          label: "Move",
          placeholder: "1+2",
        },
      },
    },
    followup: {
      controlType: "array",
      label: "Follow-ups",
      items: [],
      template: {
        move: {
          controlType: "input-field",
          value: "",
          label: "Follow-up Move",
          placeholder: "Follow-up Move",
        },
        followup: {
          controlType: "input-field",
          value: "",
          label: "Follow-up Description",
          placeholder: "Follow-up Description",
        },
      },
    },
    grabs: {
      controlType: "array",
      label: "Grabs",
      items: [],
      template: {
        grab: {
          controlType: "input-field",
          value: "",
          label: "Grab",
          placeholder: "Grab",
        },
        break: {
          controlType: "input-field",
          value: "",
          label: "Break",
          placeholder: "Break",
        },
      },
    },
    combos: {
      controlType: "array",
      label: "Combos",
      items: [],
      template: {
        title: {
          controlType: "input-field",
          value: "",
          label: "Title",
          placeholder: "Combo Title",
        },
        launchers: {
          controlType: "array",
          label: "Launchers",
          items: [],
          template: {
            controlType: "input-field",
            value: "",
            label: "Launcher",
            placeholder: "Launcher",
          },
        },
        combo: {
          controlType: "text-editor",
          value: "",
        },
        simpleVersion: {
          controlType: "text-editor",
          value: "",
        },
        demoUrl: {
          controlType: "input-field",
          value: "",
          label: "Demo URL",
          placeholder: "Demo URL",
        },
      },
    },
    comboEnders: {
      dmg: {
        controlType: "array",
        label: "Damage Enders",
        items: [],
        template: {
          controlType: "input-field",
          value: "",
          label: "Damage Ender",
          placeholder: "Ender for Damage",
        },
      },
      wallbrk: {
        controlType: "array",
        label: "Wall Break Enders",
        items: [],
        template: {
          controlType: "input-field",
          value: "",
          label: "Wall Break Ender",
          placeholder: "Ender for Wall Break",
        },
      },
      flrbrk: {
        controlType: "array",
        label: "Floor Break Enders",
        items: [],
        template: {
          controlType: "input-field",
          value: "",
          label: "Floor Break Ender",
          placeholder: "Ender for Floor Break",
        },
      },
    },
    chainGrabs: {
      controlType: "text-editor",
      value: "",
    },
    creatorNotes: {
      controlType: "text-editor",
      value: "",
    },
  },
  anti: {
    overview: {
      controlType: "text-editor",
      value: "",
    },
    counterStrategy: {
      controlType: "text-editor",
      value: "",
    },
    weakSide: {
      controlType: "input-field",
      value: "",
      label: "Weak Side",
      placeholder: "Weak Side",
    },
    range: {
      controlType: "input-field",
      value: "",
      label: "Preferred Range",
      placeholder: "e.g., Close Range",
    },
    keyMoves: {
      controlType: "text-editor",
      value: "",
    },
    detailedStrategies: {
      controlType: "array",
      label: "Detailed Strategies",
      items: [],
      template: {
        title: {
          controlType: "input-field",
          value: "",
          label: "Title",
        },
        counterStrategy: {
          controlType: "text-editor",
          value: "",
        },
        moves: {
          controlType: "text-editor",
          value: "",
        },
      },
    },
    antiDrills: {
      controlType: "text-editor",
      value: "",
    },
    creatorNotes: {
      controlType: "text-editor",
      value: "",
    },
  },
};

export default guideSchema;
