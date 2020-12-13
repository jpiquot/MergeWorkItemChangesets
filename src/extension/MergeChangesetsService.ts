import {
    WorkItem,
    WorkItemTrackingRestClient,
} from "azure-devops-extension-api/WorkItemTracking"

import { getClient } from "azure-devops-extension-api"

import { SettingsData } from "../settings/SettingsData"

class MergeChangesetsService {
    //   private workClient?: WorkItemTrackingRestClient
    settings: SettingsData
    workItemId: number
    workClient: WorkItemTrackingRestClient

    constructor(settings: SettingsData, workItemId: number) {
        this.settings = settings
        this.workItemId = workItemId
        this.workClient = this.getWorkClient()
    }
    private getWorkClient(): WorkItemTrackingRestClient {
        if (!this.workClient) {
            this.workClient = getClient<WorkItemTrackingRestClient>(
                WorkItemTrackingRestClient
            )
        }
        return this.workClient
    }
    public async execute(context: any): Promise<void> {
        const template = await this.settings.getBranch()
        console.info("Merge called : " + JSON.stringify(context))
        if (!template) {
            console.warn("The main/trunk branch is undefined.")
            return
        }

    }
    public getCurrentWorkItem(): Promise<WorkItem> {
        return this.getWorkClient().getWorkItem(this.workItemId)
    }
    public getUserStoryOrBug(): Promise<WorkItem> {
        return this.getCurrentWorkItem()
    }
}

export { MergeChangesetsService }
