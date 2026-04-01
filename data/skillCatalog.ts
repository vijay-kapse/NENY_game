export const SKILL_CLUSTERS = [
  "Safety, Handling & Storage (Batteries)",
  "LIB & Cell Fundamentals",
  "Energy Storage Systems Fundamentals",
  "Welding / Machine Tooling",
  "Hydrogen Fuel Cell Overview",
  "Transport Regulations for Batteries",
  "Technician & Basic Lab Skills",
  "Cell & Pack Assembly",
  "Manufacturing Cell/Pack Production",
  "Manufacturing Operations",
  "Testing & Diagnostics",
  "Cell Testing & Characterization",
  "Prototype Support & Engineering Validation",
  "Lab & Test Engineering",
  "Codes, Standards & Certification",
  "Quality & Compliance",
  "Maintenance & Reliability Engineering",
  "PFMEA & Process Risk Analysis",
  "Project Management & Leadership for Energy Storage Projects",
  "Materials & Components R&D for Batteries",
  "Emerging Storage Technologies",
  "Systems Engineering",
  "Battery Systems Engineering & Requirements / Integration",
  "Pack Design",
  "BMS & Power Electronics",
  "Thermal Management, Modeling & Analysis",
  "Vehicle Integration Considerations",
  "BESS Design & Grid/System Integration"
] as const;

export const STARTING_SKILLS = {
  "Battery Chemist": [
    "Safety, Handling & Storage (Batteries)",
    "LIB & Cell Fundamentals",
    "Technician & Basic Lab Skills",
    "Cell Testing & Characterization",
    "Materials & Components R&D for Batteries"
  ],
  "Battery Manufacturing": [
    "Safety, Handling & Storage (Batteries)",
    "Cell & Pack Assembly",
    "Manufacturing Operations",
    "Manufacturing Cell/Pack Production",
    "Quality & Compliance"
  ],
  "Battery Systems Engineer": [
    "Energy Storage Systems Fundamentals",
    "Systems Engineering",
    "Battery Systems Engineering & Requirements / Integration",
    "Pack Design",
    "BMS & Power Electronics"
  ]
} as const;
