/*
import {
    WorkItem,
    WorkItemTrackingRestClient,
} from "azure-devops-extension-api/WorkItemTracking"

import { getClient } from "azure-devops-extension-api"
import {
    JsonPatchOperation,
    Operation,
} from "azure-devops-extension-api/WebApi"
*/
import { SettingsData } from "../settings/SettingsData"

class MergeChangesetsService {
 //   private workClient?: WorkItemTrackingRestClient
    settings: SettingsData

    constructor(settings: SettingsData) {
        this.settings = settings
    }
    /*
    private async getWorkClient(): Promise<WorkItemTrackingRestClient> {
        if (!this.workClient) {
            this.workClient = getClient<WorkItemTrackingRestClient>(
                WorkItemTrackingRestClient
            )
        }
        return this.workClient
    }
*/
    public async execute(_: any): Promise<void> {
        const template = await this.settings.getBranch()

        if (!template) {
            console.warn("The main/trunk branch is undefined.")
            return
        }
    }

}

export { MergeChangesetsService }
