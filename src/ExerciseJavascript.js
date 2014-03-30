var arrMultStr;

function WriteData()
{
    if (typeof(Storage) == "undefined")
        return;

    localStorage.setItem("StartValue", document.getElementById("sv").value);
    localStorage.setItem("EndValue", document.getElementById("ev").value);
    //localStorage["Arr"] = JSON.stringify(arrMultStr);
    localStorage.setItem("Arr", JSON.stringify(arrMultStr));
}

function ReadData()
{
    if (typeof(Storage) == "undefined")
        return;

    if (localStorage["StartValue"] != null)
        document.getElementById("sv").value = Number(localStorage.getItem("StartValue"));
    if (localStorage["EndValue"] != null)
        document.getElementById("ev").value = Number(localStorage.getItem("EndValue"));

    if (localStorage["Arr"] != null)
    {
        //arrMultStr = JSON.parse(localStorage["Arr"]);
        arrMultStr = JSON.parse(localStorage.getItem("Arr"));
        return true;
    }

    return false;
}

function HasMultiplierInArray(value)
{
    for (var i = 0; i < arrMultStr.length; i++)
    {
        if (arrMultStr[i][0] == value)
            return true;
    }

    return false;
}

function SortArray()
{
    for (var i = 0; i < arrMultStr.length - 1; i++)
    {
        for (var j = i + 1; j < arrMultStr.length; j++)
        {
            if (Number(arrMultStr[i][0]) > Number(arrMultStr[j][0]))
            {
                var temp = arrMultStr[i];
                arrMultStr[i] = arrMultStr[j];
                arrMultStr[j] = temp;
            }
        }
    }
}

function AddRow()
{
    var mult = document.getElementById("mult").value;

    if (mult == "")
    {
        alert("Tenés que poner un valor en el campo \"Multiplier\"");
        return;
    }

    if (HasMultiplierInArray(mult))
    {
        alert("El valor Multiplier ya existe");
        return;
    }

    var str = document.getElementById("str").value;
    if (str == "")
    {
        alert("Tenés que poner algo en el campo \"String\"");
        return;
    }

    arrMultStr.push([mult, str]);

    FillTable();
}

function RemoveRow(index)
{
    describe("Index element", function() {

        it("to be less than the size of the array", function() {
            expect(index).toBeLessThan(arrMultStr.length);
        });

        it("to be grater than 0", function() {
            expect(index).toBeGreaterThan(0);
        });

    });

    if (index >= arrMultStr.length || index < 0)
        return;

    arrMultStr.splice(index, 1);

    FillTable();
}

function PrintNumbers()
{
    WriteData();

    var startValue = document.getElementById("sv").value;
    var endValue = document.getElementById("ev").value;
    var divPrintings = document.getElementById("printings");

    divPrintings.innerHTML = "";

    for(var i = startValue-1; i < endValue; i++)
    {
        var n = Number(i+1);
        var str = "";

        for (j = 0; j < arrMultStr.length; j++)
        {
            if (AreMultiples(n, arrMultStr[j][0]))
                str += arrMultStr[j][1];
        }

        if (str == "")
            str = n;

        divPrintings.innerHTML += "<p>" + str + "</p>";
    }
}

function AreMultiples(number1, number2)
{
    return ((number1 % number2) == 0 || (number2 % number1) == 0);
}

function Start()
{
    if (!ReadData())
        arrMultStr = [[3, "Fizz"], [5, "Buzz"]];

    FillTable();
}

function FillTable()
{
    SortArray();
    WriteData();

    var tbMultStr = document.getElementById("tbMultStr");

    for (var i = tbMultStr.rows.length-1; i > 0; i--)
        tbMultStr.deleteRow(i);

    for (var i = 0; i < arrMultStr.length; i++)
    {
        var row = tbMultStr.insertRow(tbMultStr.rows.length);

        var mult = row.insertCell(0);
        var str = row.insertCell(1);
        var btn = row.insertCell(2);

        mult.innerHTML = arrMultStr[i][0];
        str.innerHTML = arrMultStr[i][1];

        var btnRemove = "<button id=" + i + " onclick=\"RemoveRow(this.id)\">Remove</button>";
        btn.innerHTML = btnRemove;
    }
}

describe("Add/Remove Row", function() {
  var cantItems;

  beforeEach(function() {
    cantItems = arrMultStr.length;
  });

  it("should be able to add a row", function() {
    AddRow();
    expect(arrMultStr.length).toEqual(cantItems+1);
  });
    
  it("should be able to remove a row", function() {
    AddRow();
    expect(arrMultStr.length).toEqual(cantItems-1);
  });
});
