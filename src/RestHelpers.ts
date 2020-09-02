import manager, {ModelType} from "./Model/ModelManager";
import {Route} from "./Router/Route";
import RestController from "./Controller/RestController";

export function createRestRoutes(...models: ModelType[]): Route[] {
    const routes: Route[] = [];

    models.forEach((type: ModelType) => {
        const definition = manager.getByType(type);
        const restController = new RestController();
        restController.setModelDefinition(definition);

        routes.push({
            criteria: {
                method: 'GET',
                path: new RegExp(`^/${definition.name}$`)
            },
            action: restController.list.bind(restController),
        });

        routes.push({
            criteria: {
                method: 'GET',
                path: new RegExp(`^/${definition.name}/(?<id>[0-9]+)$`)
            },
            action: restController.get.bind(restController),
        });

        routes.push({
            criteria: {
                method: 'POST',
                path: new RegExp(`^/${definition.name}$`),
            },
            action: restController.create.bind(restController),
        });
    });

    return routes;
}