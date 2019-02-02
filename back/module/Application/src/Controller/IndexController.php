<?php
/**
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2016 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;

class IndexController extends AbstractActionController
{

  /**
   * Стартовый экшен
   *
   * @return array|\Zend\Stdlib\ResponseInterface
   */
  public function indexAction()
  {
    $requestGet = $this->getRequest()->getQuery()->toArray();

    if ($requestGet) {
      $requestContent = json_encode($requestGet, true);
    }

    $httpResponse = $this->getResponse();
    $httpResponse->setStatusCode(200);
    $httpResponse->getHeaders()->addHeaders(['Content-type' => 'application/json']);
    $httpResponse->setContent(
      json_encode([
        'success' => true,
        'message' => 'You accessed to EISMobile!',
        'request' => $requestContent
      ])
    );

    return $httpResponse;
  }

}
