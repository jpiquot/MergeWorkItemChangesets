import { IExtensionDataManager } from "azure-devops-extension-api"

/**
 * Settings are saved on Project level.
 */
export class SettingsData {
    /** Key that is used to store the child tasks template field. */
    public static readonly BRANCH =
        "fiveforty-merge-work-item-changesets-branch";

    private readonly projectId: string
    private dataService: IExtensionDataManager

    constructor(dataService: IExtensionDataManager, projectId: string) {
        this.dataService = dataService
        this.projectId = projectId
    }

    private async getValue(fieldName: string): Promise<string | null> {
        return (await this.dataService.getValue(fieldName + "-" + this.projectId)) as string
    }
    public async setBranchValue(value: string): Promise<string> {
        return this.dataService.setValue(
            SettingsData.BRANCH + "-" + this.projectId,
            value
        )
    }

    public getBranch(): Promise<string | null> {
        return this.getValue(SettingsData.BRANCH)
    }
}
