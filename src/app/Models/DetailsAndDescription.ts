import { checkListVila } from "./CheckListVila";
import { VilaPhoto } from "./VilaPhoto";
import { villaDescription } from "./VillaDescription";
import { villaDetails } from "./VillaDetails";

export class detailsAndDescription{
    villaDetails!:villaDetails;
    villaDescription!:villaDescription
    checkListVila!:checkListVila
    imageForm?:VilaPhoto
}