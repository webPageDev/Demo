var step = 0;
var data_list = [
    {'col1': 'name11', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name12', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name13', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name14', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name15', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name16', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name17', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name18', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name19', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name10', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name111', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name112', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name113', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name114', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name115', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name116', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name117', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name118', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name119', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name120', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name121', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name122', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'},
    {'col1': 'name123', 'col2': 'name1', 'col3': 'name1', 'col4': 'name1'}
];
function init_table(table_body) {
    console.log('xxxx');
    $(table_body).empty();
    var show_number = 5;
    if(step<0){
        step =0;
    }
    if(data_list.length<5){
        step=0;
        show_number=data_list.length;
    }
    if(data_list.length <step*5+5){
        step = parseInt(data_list.length/5)
        show_number = data_list.length%5;
    }
    var listToShow = '';
    page = step*5 + show_number;
    for(i=step*5;i<page;i++){
        listToShow = listToShow + init_col(data_list[i]);
    }
    $(table_body).append(listToShow);
    $('#latepage_id').text('第'+(step+1)+'页/共'+parseInt(1+data_list.length/5)+'页');
}
function init_col(data) {
    var html_data =
        '<tr>'
        +'<td>'+data.col1+'</td>'
        +'<td>'+data.col2+'</td>'
        +'<td>'+data.col3+'</td>'
        +'<td>'+data.col4+'</td>'
        +'</tr>';
    return html_data;
}
function upStep() {
    step = step-1;
    init_table(table_body);
}
function downStep() {
    step = step+1;
    init_table(table_body);
}
function firstPage() {
    step=0;
    init_table(table_body);
}
function lastPage() {
    step = data_list.length;
    init_table(table_body);
}