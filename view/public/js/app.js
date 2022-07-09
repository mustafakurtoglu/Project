	angular.module('myApp', [])
        .controller('searchCtrl', ['$scope', '$http', searchCtrl])
        .controller('contactCtrl', ['$scope', '$http', contactCtrl])
        .controller('orderFormCtrl', ['$scope', '$http', orderFormCtrl])
        .controller('subscriptionCtrl', ['$scope', '$http', subscriptionCtrl]);

    function validateEmail(email)
    {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function checkResult(response)
    {
	    return (response.result == 1) ? 1 : 0;
    }

    function subscriptionCtrl($scope, $http)
    {
        $scope.data = {};
        $scope.inputError = true;
        $scope.resultMSG = "";

        $scope.actionUrl = '/spreader/spreader.communication.php?action=subscriptionCtrl';

        $scope.makeSubscription = function(actionType, elementSource)
        {
            $scope.resultMSG = "";
            $scope.inputError = true;


/*
            if((actionType == 2) || ($scope.data.name!=undefined))
            {
*/
                if($scope.data.email!=undefined)
                {
                    if(validateEmail($scope.data.email))
                    {
                        $http.post($scope.actionUrl, { "data" : $scope.data, "action_type": actionType}).success(function(response)
                        {
                            if(response.message.result)
                            {

                                $scope.inputError = false;
                                $scope.resultMSG = response.message.answer;

                                //$scope.data.name = '';
                                $scope.data.email = '';

								if(elementSource == 'p')
								{
									$(".box").fadeOut("slow");
									$('#report_subscribe').fadeIn("slow");
								}
								else if(elementSource == 'f')
								{
									$(".box").hide();
									$('#report_footer').show();
								}
                            }
                            else
                            {
                                $scope.resultMSG = response.message.answer;
                            }
                        });
                    }
                    else
                    {
                        $scope.resultMSG = "Please enter correct email";
                    }
                }
                else
                {
                    $scope.resultMSG = "Please enter your email";
                }
/*
            }
            else
            {
                $scope.resultMSG = "Please enter your name";
            }
*/
        };
    };

    function searchCtrl($scope, $http)
    {
        $scope.q = '';

		$scope.data = {};
		$scope.data.q = '';
		$scope.resultMSG = '';

        $scope.actionUrl = '/spreader/spreader.publicData.php?action=existSearchItem';

        $scope.makeSearch = function()
        {
            if(($scope.data.q != undefined) && ($scope.data.q != ''))
            {
                $http.post($scope.actionUrl, { "data" : $scope.data}).success(function(response)
                {
                    if(response.message.result)
                    {
	                    window.location.href = '/search?query='+$scope.data.q;
                    }
                    else
                    {
                        $scope.resultMSG = response.message.answer;
                    }
                });
            }
            else
            {
                $scope.resultMSG = "Please enter query string";
            }

        };
    };

    function contactCtrl($scope, $http)
    {
	    	$scope.noSend = true;
        $scope.data = {};
        $scope.inputError = true;
        $scope.resultMSG = "";

        $scope.actionUrl = '/spreader/spreader.communication.php?action=contactCtrl';

        $scope.sendMessage = function()
        {

	        if($scope.noSend)
	        {
	            $scope.resultMSG = "";
	            $scope.inputError = true;

	            if($scope.data.name!=undefined)
	            {
	                if($scope.data.email!=undefined)
	                {
	                    if(validateEmail($scope.data.email))
	                    {
	                        if($scope.data.text!=undefined)
	                        {
	                            $http.post($scope.actionUrl, { "data" : $scope.data}).success(function(response)
	                            {
	                                // console.log($scope.data);

	                                if(response.message.result)
	                                {
	                                    $scope.inputError = false;
	                                    $scope.resultMSG = response.message.answer;

	                                    $scope.data.name = '';
	                                    $scope.data.email = '';
	                                    $scope.data.text = '';

	                                    $("#form_contact").fadeOut("slow");
																			$('#report_contact').fadeIn(800);
	                                }
	                                else
	                                {
	                                    $scope.resultMSG = response.message.answer;
	                                }
	                            });
	                        }
	                        else
	                        {
	                            $scope.resultMSG = "Please enter message text";
	                            $scope.noSend = true;
	                        }
	                    }
	                    else
	                    {
	                        $scope.resultMSG = "Please enter correct email";
	                        $scope.noSend = true;
	                    }
	                }
	                else
	                {
	                    $scope.resultMSG = "Please enter your email";
	                    $scope.noSend = true;
	                }
	            }
	            else
	            {
	                $scope.resultMSG = "Please enter your name";
									$scope.noSend = true;
	            }

	            // console.log($scope.resultMSG);
	            // $scope.noSend = false;
            }
        };
    };

		function orderFormCtrl($scope, $http)
    {
	    	$scope.noSend = true;
        $scope.data = {};
        $scope.inputError = true;
        $scope.resultMSG = "";

        $scope.actionUrl = '/spreader/spreader.communication.php?action=orderFormCtrl';

        $scope.sendMessage = function()
        {
	        $scope.resultMSG = "";

	        if($scope.noSend)
	        {
	            $scope.resultMSG = "";
	            $scope.inputError = true;

	            if(parseInt($scope.data.quantity)>=1)
	            {
	                if($scope.data.email!=undefined)
	                {
	                    if(validateEmail($scope.data.email))
	                    {
	                        if($scope.data.address!=undefined)
	                        {
														if($scope.data.address.length>20)
														{
															$scope.data.url = window.location.href;

	                            $http.post($scope.actionUrl, { "data" : $scope.data}).success(function(response)
	                            {
	                                if(response.message.result)
	                                {
	                                    $scope.inputError = false;
	                                    $scope.resultMSG = response.message.answer;

	                                    $scope.data.quantity = '';
	                                    $scope.data.email = '';
	                                    $scope.data.address = '';
	                                    $scope.data.note = '';

	                                    $("#form_contact").fadeOut("slow");
																			$('#report_contact').fadeIn(800);
	                                }
	                                else
	                                {
	                                    $scope.resultMSG = response.message.answer;
	                                }
	                            });
	                        }
	                        else
	                        {
	                            $scope.resultMSG = "The address is too short (it should be at least 20 symbols)";
	                            $scope.noSend = true;
	                        }
												}else{
	                            $scope.resultMSG = "Please enter address";
	                            $scope.noSend = true;
	                        }
	                    }
	                    else
	                    {
	                        $scope.resultMSG = "Please enter correct email";
	                        $scope.noSend = true;
	                    }
	                }
	                else
	                {
	                    $scope.resultMSG = "Please enter your email";
	                    $scope.noSend = true;
	                }
	            }
	            else
	            {
	                $scope.resultMSG = "Please enter quantity";
									$scope.noSend = true;
	            }
            }
        };
    };
