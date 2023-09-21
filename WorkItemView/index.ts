import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./src/App";

interface MyInputs extends IInputs {
    imageUrl: string;
    defaultimageUrl: string;
}

export class WorkItemView implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container: HTMLDivElement;
    private imgElement: HTMLImageElement;
    private imageUrl: string;
    private defaultimgElement: HTMLImageElement;
    private defaultimageUrl: string;
    constructor() {}

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void {
        this.imgElement = document.createElement("img");
		context.resources.getResource("dots.png", this.setImage.bind(this, "dots.png", false, "png"), this.showError.bind(this));
        // context.resources.getResource("defaulticon.png", this.setImage.bind(this, false, "png"), this.showError.bind(this));
		container.appendChild(this.imgElement);
        this.defaultimgElement = document.createElement("img");
		// context.resources.getResource("dots.png", this.setImage.bind(this, "dots.png", false, "png"), this.showError.bind(this));
        context.resources.getResource("defaulticon.png", this.setImage.bind(this, "defaulticon.png", false, "png"), this.showError.bind(this));
		container.appendChild(this.defaultimgElement);
        this.container = container;
        
    }

    private setImage(name: string, shouldUpdateOutput:boolean, fileType: string, fileContent: string): void
	{
        if (name === "dots.png") {
            this.imageUrl = this.generateImageSrcUrl(fileType, fileContent);
            this.imgElement.src = this.imageUrl;
        } else {
            this.defaultimageUrl = this.generateImageSrcUrl(fileType, fileContent);
            this.defaultimgElement.src = this.defaultimageUrl;
        }
        
        this.updateView();
        
	}

	private generateImageSrcUrl(fileType: string, fileContent: string): string
	{
		return  "data:image/" + fileType + ";base64, " + fileContent;
	}

    private showError(): void
	{
        console.log('error occur');
        
	}

    public updateView(context?: ComponentFramework.Context<IInputs>): void {
        this.renderComponent();
    }
    
    private renderComponent(): void {
        if (this.imageUrl && !this.imageUrl.includes('undefined') && this.defaultimageUrl && !this.defaultimageUrl.includes('undefined')) {
            
            ReactDOM.render(React.createElement(App, { imageUrl: this.imageUrl, defaultimageUrl: this.defaultimageUrl }), this.container);
        } else {
            ReactDOM.render(React.createElement(App), this.container);
        }
        
    }

    public getOutputs(): IOutputs
    {
        return {};
    }

    public destroy(): void {
    // Add code to cleanup control if necessary
    }
}
