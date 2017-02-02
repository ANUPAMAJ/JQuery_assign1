$(function () {

	var $mv_lists = $('#mv_lists');
	var $mv_details = $('#mv_details');
	var $title = $('#title');
	var $btn_search = $('#btn_search');

	 $btn_search.on('click', function () {
	 	$mv_details.empty();
		$.ajax({
			type:'GET',
			url:'http://www.omdbapi.com/?s=title',
			success:function(data) 
			{
				$mv_lists.empty();
				var template ="<tr><td>Title</td><td>Search</td></tr>";
				$mv_lists.append(template);
				var mydata = data.Search;
				var flag = 0;
				$.each(mydata, function( i, movies) 
				{
					var title = $title.val();
					if(movies.Title.toLowerCase().includes(title.toLowerCase()))
					{
						flag = 1;
						var template ="<tr><td>" + movies.Title + "</td><td  id = 'hid'>" + movies.imdbID + "</td><td><button id = 'More_Info'>More Info</button></td></tr>";
						$mv_lists.append(template);
					}
				});
				if(flag === 0)
				{
					$mv_lists.empty();
					$mv_lists.append( "<li>Sorry! No results found.</li>" );
				}
				if(flag === 1)
				{
					flag = 0;
				}

			}
		});		
	});//End of search button
	 $mv_lists.delegate('#More_Info', 'click', function(){
		var $slct_mv = $(this).closest('td').prev('td');
		//alert($slct_mv.text()) ;	
		$.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?s=title',
		success:function(data) 
		{
		    $mv_details.empty();
		    var template ="<tr><td>Title</td><td>Year</td><td>imdbID</td><td>Type</td><td>Poster</td></tr>";
			$mv_details.append(template);	
			var mydata = data.Search;
			$.each(mydata, function( i, movies) 
			{
				if(movies.imdbID === $slct_mv.text())
					{
						var template2 ="<tr><td>" + movies.Title + "</td><td>" + movies.Year + "</td><td>" + movies.imdbID + "</td><td>" + movies.Type + "</td><td><img class = 'img-responsive' src = '" + movies.Poster + "' alt = 'No image'></td></tr>";
						$mv_details.append(template2);
					}
			});
		}
	});
	});//End of More Info

});