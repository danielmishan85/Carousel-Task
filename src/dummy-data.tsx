export const secretGrantDocuments: GrantDocument[] = [
  {
    grant: {
      stakeholderName: "Aki Avni",
      taxRules: [
        {
          countryCode: 376,
          taxRuleName: "Rule A",
        },
        {
          countryCode: 840,
          taxRuleName: "Rule B",
        },
      ],
    },
    documentContent: "Lorem ipsum, dolor sit amet consectetur adipisicing elit",
  },
  {
    grant: {
      stakeholderName: "Benny Barda",
      taxRules: [
        {
          countryCode: 376,
          taxRuleName: "Rule A",
        },
        {
          countryCode: 380,
          taxRuleName:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, saepe!",
        },
        {
          countryCode: 388,
          taxRuleName: "Rule D",
        },
      ],
    },
    documentContent: "Earum fuga distinctio, quis quam deserunt neque",
  },
  {
    grant: {
      stakeholderName: "Charlie Chaplin",
      taxRules: [
        {
          countryCode: 410,
          taxRuleName: "Rule E",
        },
        {
          countryCode: 410,
          taxRuleName: "Rule F",
        },
      ],
    },
    documentContent: "Maiores sed expedita sint voluptate autem eum odio",
  },
  {
    grant: {
      stakeholderName: "Danny DeVito",
      taxRules: [
        {
          countryCode: 724,
          taxRuleName: "Rule G",
        },
        {
          countryCode: 250,
          taxRuleName: "Rule H",
        },
      ],
    },
    documentContent: "Voluptas nulla id blanditiis modi quae tenetur",
  },
  {
    grant: {
      stakeholderName: "Eddie Efrati",
      taxRules: [
        {
          countryCode: 203,
          taxRuleName: "Rule I",
        },
        {
          countryCode: 826,
          taxRuleName: "Rule J",
        },
      ],
    },
    documentContent: "Laborum voluptas officia ducimus mollitia",
  },
];

export type GrantDocument = {
  grant: Grant;
  documentContent: string;
};

export type Tax = {
  countryCode: number; // Example: 1, 2, 3...
  taxRuleName: string; // Example: "Rule A", "Rule B"...
};

export type Grant = {
  stakeholderName: string; // Example: "Aki Avni"
  taxRules: Tax[];
};
