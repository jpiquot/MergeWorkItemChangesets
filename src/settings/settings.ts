import {
    CommonServiceIds,
    IExtensionDataService,
    IProjectPageService,
} from "azure-devops-extension-api"
import * as SDK from "azure-devops-extension-sdk"
import { SettingsData } from "./SettingsData"
import "./settings.scss"

class Program {
    public static initialized = false;
    public static settings: SettingsData
    public static async run() {
        SDK.init({
            applyTheme: true,
            loaded: false,
        })
        await SDK.ready()
        this.initSettings()
        SDK.notifyLoadSucceeded()
    }

    private static async initSettings(): Promise<void> {
        const extension: SDK.IExtensionContext = SDK.getExtensionContext()
        const projectService = await SDK.getService<IProjectPageService>(
            CommonServiceIds.ProjectPageService
        )
        const project = await projectService.getProject()
        if (project === undefined) {
            throw Error("No project defined.")
        }
        const dataService = await SDK.getService<IExtensionDataService>(
            CommonServiceIds.ExtensionDataService
        )
        this.settings = new SettingsData(
            await dataService.getExtensionDataManager(
                extension.id,
                await SDK.getAccessToken()
            ),
            project.id
        )
        await this.initForm()
    }
    private static async getField(name: string): Promise<HTMLInputElement> {
        const field = document.querySelector('[name="' + name + '"]') as HTMLInputElement
        if (field === null) {
            throw Error("The form query field with name " + name + " was not found.")
        }
        return field
    }
    private static getBranchField(): Promise<HTMLInputElement> {
        return this.getField("branch")
    }
    private static async initForm(): Promise<void> {
        const branchField = await Program.getBranchField()
        const branchValue = await Program.settings.getBranch()
        if (branchValue === null || branchValue === undefined) {
            branchField.value = ""
        }
        else {
            branchField.value = branchValue
        }
        const button = document.getElementById('merge-work-item-changesets-button')
        if (button === null) {
            throw Error("The form element was not found.")
        }
        button.addEventListener('click', async (e: Event): Promise<void> => {
            e.preventDefault()
            const branchDefault = await Program.getBranchField()
            await Program.settings.setBranchValue(branchDefault.value)
        })
    }
}
Program
    .run()
    .then(() => {
        console.info("Extension initialized.")
    })

