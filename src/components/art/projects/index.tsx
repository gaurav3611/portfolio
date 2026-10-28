import { AutomateHubArt } from "./AutomateHubArt";
import { MinimalArt, SswinggArt, TraceArt } from "./Covers";
import { CricketArt } from "./CricketArt";
import { EcommerceArt } from "./EcommerceArt";
import { HealthRecordsArt } from "./HealthRecordsArt";

export const PROJECT_ART = {
  "automate-hub": AutomateHubArt,
  "ipfs-health-records": HealthRecordsArt,
  "iot-cricket-swing-analyzer": CricketArt,
  "distributed-ecommerce": EcommerceArt,
  "sswingg-platform": SswinggArt,
  "trace-edge-routing": TraceArt,
  "minimal-launcher": MinimalArt,
} as const;

export type ProjectArtSlug = keyof typeof PROJECT_ART;
