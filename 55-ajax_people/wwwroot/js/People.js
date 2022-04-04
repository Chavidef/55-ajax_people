$(() => {

    loadPeople()

    function loadPeople() {
        $.get('/home/getall', function (people) {
            $("#people-table tr:gt(0)").remove()
            people.forEach(person => {
                $("#people-table tbody").append(`
<tr>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>
    <td>
        <button class="btn btn-warning btn-block btn-edit" data-id="${person.id}" data-firstname="${person.firstName}" data-lastname="${person.lastName}" data-age="${person.age}">Edit</button>
    </td>
    <td>
        <button class="btn btn-danger btn-block btn-delete" data-id="${person.id}" >Delete</button>
    </td>
</tr>`)
            })
        })
    }

    $("#add-person").on('click', function () {
        const firstName = $("#first-name").val()
        const lastName = $("#last-name").val()
        const age = $("#age").val()


        $.post('/home/addperson', { firstName, lastName, age }, function (person) {
            loadPeople()
            $("#first-name").val('')
            $("#last-name").val('')
            $("#age").val('')
        });
    });

    $("#people-table").on('click', '.btn-edit', function () {
       
        const first = $(this).data('firstname')
        const last = $(this).data('lastname')
        const age = $(this).data('age')
        const id = $(this).data('id')

        $("#edit-modal").modal()

        $("#modalfirstName").val(first)
        $("#modallastName").val(last)
        $("#modalage").val(age)
        $("#edit-modal").append(`<input type="hidden" data-id="${id}" name="id" />`) //messing around...
        $("#id").data('person-id', id);
    })

    $("#edit-in-modal").on('click', function (person) {

        const firstName = $("#modalfirstName").val()
        const lastName = $("#modallastName").val()
        const age = $("#modalage").val()
        const id = $("#id").data('person-id');

        console.log(id)

        $.post('/home/editperson', { id, firstName, lastName, age }, function () {
            $('#edit-modal').modal('hide');
            loadPeople()
        })
    })

    $("#people-table").on('click', '.btn-delete', function () {
      
        const id = $(this).data('id')

        $.post('/home/deleteperson', { id }, function () {
            loadPeople()
        })
    })

    
})