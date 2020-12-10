# Merge Work Item Changesets

Use this extension to enable merging work item changesets from the dev/feature branch to the main/trunk branch.

## Configuration

You can configure this extension in the project settings page.

Parent field values can be used with string interpolation. Parent field values can be used like this : "My text {Field Type}"

You can also use these special values :

- id : the parent work item ID value
- rev : the parent work item revision number
- url : the parent work item URL

```json
{
  "tasks": [
    {
      "name": "Design Task",
      "fields": [
        {
          "name": "System.Title",
          "value": "{System.Title} test child task for {id}"
        }
      ]
    }
  ]
}
// Parent Work Item > Id:6756; Title:"My demo user story title"
//    => "My demo user story title test child task for 6756"
```

![Settings screen](static/project_setup.png)

Template sttings example :

[Json template](static/demoTemplate.json)
